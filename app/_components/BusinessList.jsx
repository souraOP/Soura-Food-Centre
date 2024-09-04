"use client"
import { useSearchParams } from 'next/navigation'
import {React, useEffect, useState} from 'react'
import GlobalApi from '../_utils/GlobalApi';
import BusinessItem from './BusinessItem';
import RestaurantItemSkeleton from './RestaurantItemSkeleton';

function BusinessList() {
    // we need to get the list of categories
    const searchParams = useSearchParams();
    const [category, setCategory] = useState('all');  // initially the category will be set to all
    // const [category, setCategory] = useState('');

    // 4. this is for adding the skeleton for loading
    const [loading, setLoading] = useState(false);

    // 3. after this we gotta save the restaurant business we got using useState
    const [restaurantList, setRestaurantList] = useState([]);
    useEffect(() => {
      // const categoryFromParams = searchParams ? searchParams.get('category') : 'defaultCategory';
      // setCategory(categoryFromParams);
      // getBusinessCategoryList(categoryFromParams);
        searchParams && setCategory(searchParams.get('category'))
        searchParams && getBusinessCategoryList(searchParams.get('category'))
    }, [searchParams]);

    // 2. after creating the api for getting the business list
    const getBusinessCategoryList = (getCategory) =>{
        // when we fetch the loading we will set the loading skeleton as true
        setLoading(true);
        GlobalApi.GetBusiness(getCategory).then(res => {
            // console.log(res);
            setRestaurantList(res?.restaurants);
            // after getting the data we will set the loading skeleton to false so that it disappears
            setLoading(false);
        })
    }   

  return (
    <div className= "mt-5">
      <h2 className = "font-bold text-2xl">Popular {category} Restaurants</h2>
      <h2 className = 'font-bold text-primary'>Restaurant(s) Avaliable: {restaurantList?.length}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-5">
        {!loading ? restaurantList.map((restaurants, index) => (
            <BusinessItem key={index} business={restaurants}/>
        )):
        // adding the skeleton effect
        [1,2,3,4,5,6,7,8].map((item, index) => (
            <RestaurantItemSkeleton />
        ))
        }
      </div>
    </div>
  )
}

export default BusinessList
