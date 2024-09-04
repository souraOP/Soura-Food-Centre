import { UpdateCartContext } from '@/app/_context/UpdateCartContext';
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs';
import { CirclePlus } from 'lucide-react';
import Image from 'next/image';
import {React, useState, useEffect, useContext} from 'react'
import { toast } from 'sonner';

function MenuTabs({restaurantDetails}) {
    // store the menu items in a state
    const [menuItemsList, setMenuItems] = useState([]);
    const {user} = useUser();
    const {updateCart, setUpdateCart} = useContext(UpdateCartContext);

    // for showing the first category as the default one
    useEffect(()=>{
        restaurantDetails?.menu && filterMenu(restaurantDetails?.menu[0]?.category)
    }, [restaurantDetails])

    const filterMenu=(category)=>{
        const result = restaurantDetails?.menu?.filter((item)=>item.category==category)
        // console.log(result[0]);
        setMenuItems(result[0]);
    }

    // adding the add to handler from the global api
    const AddToCartHandle = (item) => {
        toast("Adding to Cart..");
        const data = {
            email: user?.primaryEmailAddress?.emailAddress,
            name: item?.name,
            description: item?.description,
            productImage: item?.productImage?.url,
            price: item?.price,
            restaurantSlug: restaurantDetails.slug
        }
        // console.log(data);
        GlobalApi.AddToCart(data).then(res => {
            console.log(res);
            setUpdateCart(!updateCart); //since we gotta change the cart value all the time for the we used !updateCart
            toast('Added!');
        },(error)=>{
            toast("Error occurred!");
        })
    }
  return (
    <div>
      <div className = "grid grid-cols-4 mt-2">
        <div className = "hidden md:flex flex-col gap-2 mr-10">
            {restaurantDetails?.menu?.map((item) => (
                <Button variant = "ghost" className = "justify-start flex" key={item.category}
                    onClick={() => filterMenu(item.category)}
                >
                    {item.category}
                </Button>
            ))}
        </div>
        <div className = "md:col-span-3 col-span-4">
            <h2 className = "text-lg font-extrabold">{menuItemsList?.category}</h2>
            <div className ="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
                {menuItemsList?.menuItem?.map((item)=>(
                    <div className = "p-2 flex gap-4 border rounded-xl hover:border-primary cursor-pointer" key={item.id}>
                        <Image src={item?.productImage?.url} alt={item.name}
                            width = {120} height={120} className = "object-cover w-[120px] h-[120px] rounded-lg"
                        />
                        <div className = "flex flex-col gap-1">
                            <h2 className = "font-bold">
                                {item.name}
                            </h2>
                            <h2>
                                {item.price}
                            </h2>
                            <h2 className="line-clamp-2 text-gray-400 text-sm">
                                {item.description}
                            </h2>
                            <CirclePlus className = 'cursor-pointer' onClick={()=>AddToCartHandle(item)}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  )
}

export default MenuTabs
