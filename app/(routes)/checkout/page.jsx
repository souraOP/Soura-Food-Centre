'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { UpdateCartContext } from '@/app/_context/UpdateCartContext'
import {React, useEffect, useState, useContext} from 'react'
import { useUser } from '@clerk/nextjs'
import GlobalApi from '@/app/_utils/GlobalApi'
// import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import ShimmerButton from '@/components/magicui/shimmer-button'
import { PayPalButtons } from '@paypal/react-paypal-js'

function Checkout() {
  const router = useRouter();
  const {user} = useUser();
  const params = useSearchParams();
  const [cart, setCart] = useState([]);
  const {updateCart, setUpdateCart} = useContext(UpdateCartContext);
  const [deliveryAmount, setDeliveryAmount] = useState(40);
  const [loading, setLoading] = useState(false);
  // calculating the total Amount
  const [totalAmount, setTotalAmount] = useState(0);
  //storing the tax amount
  const [taxAmount, setTaxAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  // for the billing state
  const [username, setUsername] = useState()
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    // console.log(params.get('restaurant'))
    user && getUserCart();
  }, [user || updateCart])

  const calculateTotalAmountOfCart = (cart_) => {
    let total = cart_.reduce((sum, item) => sum + item.price, 0);
    const formattedTotal = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(total);
    setSubTotal(formattedTotal);
    setTaxAmount(total * 0.05);
    const totalPrice = total + total*0.05 + deliveryAmount;
    // const formattedFinalTotalAmount = new Intl.NumberFormat('en-IN', {
    //   style: 'currency',
    //   currency: 'INR',
    //   minimumFractionDigits: 2
    // }).format(totalPrice);
    setTotalAmount(totalPrice);
  }
  // const fPrice = Number(totalAmount.replace(/[^0-9.-]+/g, ''));
  const getUserCart=() => {
    GlobalApi.GetUserCart(user?.primaryEmailAddress.emailAddress).then(res => {
      // console.log(res);  // all the cart items will show 
      // storing all the cart details
      setCart(res?.userCarts || []);
      calculateTotalAmountOfCart(res?.userCarts);
    })
    .catch((error) => {
      console.log("Error, fetching cart details: ", error)
    });
  }

  const addToOrder = () => {
    setLoading(true);
    const data = {
      email: user?.primaryEmailAddress?.emailAddress,
      orderAmount: totalAmount, // this is for converting the formatted amount into normal float format
      restaurantName: params.get('restaurant'),
      userName: user.fullName,
      address: address,
      phone: phone,
      zipCode: zip
    }
    GlobalApi.CreateNewOrder(data).then(res => {
      const orderID = res?.createOrder?.id;

      if(orderID){
        cart.forEach((item) => {
          GlobalApi.UpdateOrderToAddOrderItems(item.productName, item.price, orderID, user?.primaryEmailAddress?.emailAddress).then(res => {
            console.log(res);
            setLoading(false);
            toast("Order Created Successfully !");
            setUpdateCart(!updateCart);
            SendEmail();
            router.replace('/confirmation');
          }, (error) => {
            setLoading(false)
          })
        })
      }
    }, (error) => {
      setLoading(false);
      toast("Failed to place order !")
    })
  }

  const SendEmail = async() => {
    try{
      const response = await fetch('api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application.json'
        },
        body: JSON.stringify({email: user?.primaryEmailAddress.emailAddress})
      })

      if(!response.ok){
        toast("Error while sending email");
      } else {
        toast("Confirmation Email Sent");
      }
    } catch (error) {
      console.log(error);
      toast("Error while sending email");
    }
  }


  return (
    <div>
      <h2 className = "font-bold text-2xl my-5">Checkout</h2>
      <div className = "p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
        <div className = "md:col-span-2">
          <h2 className = "font-bold text-3xl">Billing Details</h2>
          <div className = "grid grid-cols-2 gap-10 mt-5">
            <Input placeholder = "Name" onChange={(e) => setUsername(e.target.value)}/>
            <Input placeholder = "Email" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className = "grid grid-cols-2 gap-10 mt-3">
            <Input placeholder = "Phone" onChange = {(e) => setPhone(e.target.value)}/>
            <Input placeholder = "Zip" onChange = {(e) => setZip(e.target.value)}/>
          </div>
          <div className = "mt-3">
            <Input placeholder = "Address" onChange = {(e) => setAddress(e.target.value)}/>
          </div>
        </div>

        <div className = 'md:mt-0 mt-10 md:mx-10 border rounded-xl shadow-xl'>
          <h2 className = "p-3 bg-orange-500 shadow-md rounded-t-xl font-bold text-center">Total Cart ({cart?.length})</h2>
          <div className = "p-4 flex flex-col gap-4">
            <h2 className = "font-bold flex justify-between">Subtotal : <span>{subTotal}</span></h2>
            <hr></hr>
            <h2 className = "flex justify-between">Delivery : <span>₹{deliveryAmount}</span></h2>
            <h2 className = "flex justify-between">GST : <span>₹{taxAmount.toFixed(2)}</span></h2>
            <hr></hr>
            <h2 className = "font-bold flex justify-between">Total : <span>₹{totalAmount}</span></h2>
            {/* <ShimmerButton onClick = {() => SendEmail()} className = "font-bold text-white flex justify-center items-center text-lg" >
              {loading ? <Loader className = "animate-spin" />: 'Pay'}
            </ShimmerButton> */}
            {totalAmount>0 && <PayPalButtons style={{ layout: "vertical" }} onClick={() => SendEmail()} onApprove={addToOrder} disabled={!(username&&email&&address&&phone&&zip) || loading}
               createOrder={(data, action) => {
                return action.order.create({
                  purchase_units: [{
                    amount: {
                      value: totalAmount.toFixed(2),
                      currency_code: "USD"
                    }
                  }]
                })
               }}
            />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
