import GlobalApi from '@/app/_utils/GlobalApi'
import { useUser } from '@clerk/nextjs'
import moment from 'moment';
import {React, useEffect, useState} from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  

export default function MyOrders() {
    const {user} = useUser();
    useEffect(() => {
        user && GetUserOrders();
    }, [user])

    // saving the orders on a state
    const [orderLog, setOrderLog] = useState([]);
    const GetUserOrders = () => {
        GlobalApi.GetUserOrders(user?.primaryEmailAddress?.emailAddress).then(res => {
            // console.log(res?.orders);
            setOrderLog(res?.orders);
        })
    }
  return (
    <div className = "text-white">
        <h2 className = "font-bold text-lg">My Orders</h2>
        <div className="grid grid-cols-1 gap-5 mt-3">
            {orderLog.map((order, index) => (
                <div className = "rounded-lg p-4 bg-slate-800 flex flex-col gap-3">
                    <h2 className="font-bold text-slate-300">Order placed on: {moment(order?.createdAt).format('Do MMMM, YYYY - HH:mm A')}</h2>
                    <h2 className = "flex text-sm justify-between mt-2">Total Amount: <span>₹ {(order?.orderAmount).toFixed(2)}</span></h2>
                    <h2 className = "flex text-sm justify-between text-pretty">Address: <span>{order?.address}, {order.zipCode}</span></h2>
                    
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger><h2 className = "text-amber-400 text-sm underline">View Order Details</h2></AccordionTrigger>
                            <AccordionContent>
                            <div className = "flex gap-3 flex-col">
                                {order?.orderDetail?.map((item, index) => (
                                    <div className = "flex justify-between">
                                        <h2>
                                            {item.name}
                                        </h2>
                                        <h2>
                                            ₹ {item.price}
                                        </h2>
                                    </div>
                                ))}
                                <hr></hr>
                                <h2 className = "justify-between flex font-bold mt-2 text-md">Total order amount (Including Taxes): <span>₹ {(order?.orderAmount).toFixed(2)}</span></h2>
                            </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                </div> 
            ))}
        </div>
    </div>
  )
}
