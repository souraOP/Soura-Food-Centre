import { ConfettiButton } from '@/components/magicui/confetti'
import AnimatedGradientText from '@/components/magicui/animated-gradient-text'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import {React, useContext} from 'react'
import GlobalApi from '../_utils/GlobalApi'
import { toast } from 'sonner'
import { UpdateCartContext } from '../_context/UpdateCartContext'
import Link from 'next/link'

function CartPopover({cart}) {
  // 1. for calculating the Cart total amount
  // const CalculateCartTotalAmount= () => {
  //   let totalSum = 0;
  //   cart.forEach((item) => {
  //     totalSum = totalSum + item.price;
  //   })
  //   return totalSum;
  // }
  const {updateCart, setUpdateCart} = useContext(UpdateCartContext);
  const CalculateCartTotalAmount = () => {
    const totalSum = cart.reduce((sum, item) => sum + item.price, 0);

    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(totalSum);
  };

  const RemoveFoodFromCart = (id) => {
    GlobalApi.RemoveRestaurantFromCart(id).then(res => {
      console.log(res);  // we are removing the restaurant from the Food Item
      if(res) {
        GlobalApi.DeleteItemFromCart(id).then(resp => {
          console.log(resp);
          toast('Item Removed !');
          setUpdateCart(!updateCart)
        })
      }
    })
  }

  return (
    <div>
      <h2 className = "text-lg font-bold">{cart[0]?.restaurant?.name}</h2>
      <div className = "mt-4 flex flex-col gap-3">
        <h2 className = "font-bold">
          My Orders: 
        </h2>
        {cart&&cart.map((item, index) => (
          <div key={index} className = 'flex justify-between gap-8 items-center'>
            <div className = "flex gap-3 items-center">
              <Image src={item.productImage} alt={item.productName} width = {40} height = {40} className = "h-[40px] w-[40px] rounded-xl object-cover"/>
              <h2 className = "text-sm">{item?.productName}</h2>
            </div>
            <h2 className = "font-bold flex gap-2 items-center">₹{item?.price}

              <X 
                className = "text-red-600 h-4 w-4"
                onClick = {() => RemoveFoodFromCart(item.id)}
              />
            </h2>
            
          </div>
        ))}
        <Link href = {'/checkout?restaurant='+cart[0]?.restaurant?.name}>
          <ConfettiButton className = "w-full">
            <AnimatedGradientText>
              <span
                className={cn(
                  `inline text-lg animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                )}
                >
                Checkout {CalculateCartTotalAmount()}
              </span>
            </AnimatedGradientText>
          </ConfettiButton>
        </Link>

      </div>
    </div>
  )
}

export default CartPopover
