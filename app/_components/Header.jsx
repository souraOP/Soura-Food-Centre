"use client";

import { Button } from '@/components/ui/button'
import { SignInButton, SignOutButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { Search, ShoppingCartIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {React, useContext, useEffect, useState} from 'react'
import { UpdateCartContext } from '../_context/UpdateCartContext'
import GlobalApi from '../_utils/GlobalApi'
import ShineBorder from '@/components/magicui/shine-border'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import CartPopover from './CartPopover'


function Header() {

  // check if user signed in or not
  const {user, isSignedIn} = useUser();
  const {updateCart, setUpdateCart} = useContext(UpdateCartContext);
  const [cart, setCart] = useState([]);

  // use useEffect only when the updateCart gets updated
  useEffect(() => {
    // console.log("Got executed..");
    if(user) {
      getUserCart();
    }
  }, [user, updateCart])

  const getUserCart=() => {
    GlobalApi.GetUserCart(user?.primaryEmailAddress.emailAddress).then(res => {
      // console.log(res);  // all the cart items will show 
      // storing all the cart details
      setCart(res?.userCarts || []);
    })
    .catch((error) => {
      console.log("Error, fetching cart details: ", error)
    });
  }

  return (
    <div className="flex justify-between items-center md:px-10 p-4 shadow-sm">
    {/* creating logo space */} 
      <Link href = "/">
        <Image src='/logo.png' width={200} height={200} alt='sfc-logo' priority className="w-24 md:w-48"/>
      </Link>  

      <ShineBorder className = "bg-slate-100 hidden md:hidden lg:flex border p-2 rounded-lg w-96 shadow-xl" color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
        <div className = "flex w-full items-center">
          <input type = 'text' className="bg-transparent w-full outline-none" placeholder="Search for your loved food"/>
          <Search className = "text-primary"/>
        </div>
      </ShineBorder>

      {isSignedIn ? (
      <div className = "flex gap-3 items-center">
        <Popover>
          <PopoverTrigger asChild>
          <div className = "flex gap-2 items-center cursor-pointer">
            <ShoppingCartIcon />
            <label className = "rounded-full bg-emerald-200 p-1 px-3">{cart?.length}</label>
          </div>
          </PopoverTrigger>
          <PopoverContent className = "w-full">
            <CartPopover cart={cart}/>
          </PopoverContent>
        </Popover>

        {/* <UserButton/> */}
        
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image 
              src = {user?.imageUrl} alt = 'user'
              width = {40}
              height = {40}
              className = "rounded-full"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href = {"/user"}>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <Link href = {"/user/my-orders"}>
              <DropdownMenuItem>My Orders</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Contact Us</DropdownMenuItem>
            <SignOutButton>
              <DropdownMenuItem>Log Out</DropdownMenuItem>  
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
      
      ):(<div className="flex gap-5">
        <SignInButton mode='modal'>
          <Button variant="outline">Login</Button>
        </SignInButton>
        <SignUpButton modal="redirect">
          <Button variant="default">Sign Up</Button>
        </SignUpButton>
      </div>
      )}
    </div>
  )
}

export default Header
