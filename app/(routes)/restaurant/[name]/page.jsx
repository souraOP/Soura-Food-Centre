"use client"

import GlobalApi from '@/app/_utils/GlobalApi'
import { usePathname } from 'next/navigation'
import {React, useEffect, useState} from 'react'
import Intro from '../_components/Intro';
import { Tabs } from '@/components/ui/tabs';
import RestaurantTabs from '../_components/RestaurantTabs';

function RestaurantDetails() {

    // 2. here we will get the current path name and return to the api as slug
    const param = usePathname();

    //3. we have to save the details obtained from the api in useState
    const [restaurantDetails, setRestaurantDetails] = useState([]);

    useEffect(() => {
        // console.log(param.split("/")[2]) // this will get us only the name of the restaurant
        GetRestaurantDetails(param.split("/")[2])
    }, [])

    // 1. here we are trying to the fetch business details
    const GetRestaurantDetails = (restroSlug) => {
        GlobalApi.GetBusinessDetails(restroSlug).then(res => {
            // console.log(res)
            // saving the restaurant details in the use state
            setRestaurantDetails(res.restaurant);
        })
    }
  return (
    <div>
        <Intro restaurantDetails={restaurantDetails}/>
        <RestaurantTabs restaurantDetails={restaurantDetails}/>
    </div>
  )
}

export default RestaurantDetails
