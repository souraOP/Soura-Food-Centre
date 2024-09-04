"use client"

import {React, useState} from 'react'
import Header from './_components/Header'
import { Toaster } from '@/components/ui/sonner'
import { UpdateCartContext } from './_context/UpdateCartContext'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Provider({children}) {
  const [updateCart, setUpdateCart] = useState(false);
  return (
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
        <UpdateCartContext.Provider value = {{updateCart, setUpdateCart}}>
          <div className = "px-10 md:px-20 relative mb-20">
              <Header/>
              <Toaster />
              {children}
          </div>
        </UpdateCartContext.Provider>
      </PayPalScriptProvider>
  )
}

export default Provider
