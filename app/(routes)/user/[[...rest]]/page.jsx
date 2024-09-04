"use client";

import { UserProfile, UserButton } from '@clerk/nextjs'
import { ShoppingBagIcon } from 'lucide-react'
import React from 'react'
import MyOrders from '../_components/MyOrders';


function User() {
  return (
      <div className = "flex justify-center items-center">
        <UserProfile>
          <UserButton.UserProfilePage label="My Orders" labelIcon={<ShoppingBagIcon className = "h-4 w-4"/>} url="my-orders">
            <MyOrders />
          </UserButton.UserProfilePage>
        </UserProfile>
      </div>
  )
}

export default User
