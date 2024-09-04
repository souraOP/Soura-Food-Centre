import { MapPinIcon } from 'lucide-react'
import Image from 'next/image'
import {React, useState, useEffect} from 'react'

function Intro({restaurantDetails}) {

  const [totalRating, setTotalRating] = useState();
  const [averageRating, setAverageRating] = useState();
  useEffect(() => {
    restaurantDetails&&CalculateRating()
  }, [restaurantDetails])
  const CalculateRating=() => {
    let total = 0;
    let count = 0;
    restaurantDetails?.review?.forEach(item => {
      total = total + item.star;
      count++;
    })  
    setTotalRating(count);
    // getting the average
    const result = total / count;
    setAverageRating(result?result.toFixed(1):4.5);
  }
  return (
    <div>
      {restaurantDetails?.banner?.url ? 
      <div>
        <Image src = {restaurantDetails?.banner?.url}
            width = {1000}
            height = {600}
            alt = "banner"
            priority
            className = "w-full h-[450px] rounded-xl object-cover mt-2"
        
        />
      </div>:
      <div className = "h-[220px] w-full bg-slate-200 animate-pulse rounded-xl">
      </div>}
      <h2 className = "text-3xl mt-2 font-bold">{restaurantDetails.name}</h2>
      <div className = "flex items-center gap-2 mt-2">
        <Image src={'/star.png'} alt='star' width = {20} height = {20}/>
        <label className="text-gray-400 text-sm">{averageRating} ({totalRating})</label>
      </div>
      <h2 className = "flex gap-3 mt-2 items-center text-gray-600">
        <MapPinIcon />
        {restaurantDetails?.address}
      </h2>
    </div>
  )
}

export default Intro
