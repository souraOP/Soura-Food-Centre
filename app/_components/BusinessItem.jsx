import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function BusinessItem({business}) {
  // for getting the rating of each restaurant
  const CalculateRating=() => {
    let total = 0;
    let count = 0;
    business?.review.forEach(item => {
      total = total + item.star;
      count++;
    })  

    // getting the average
    const result = total / count;
    return result?result.toFixed(1):'5';
  }
  return (
    <Link href={'/restaurant/'+business?.slug} className='p-3 hover:border rounded-xl hover:border-green-500 hover:bg-green-50'>
      {/* display the image of the banner */}
      <Image 
        src={business.banner?.url} 
        alt={business.name}
        width = {500}
        height = {300}
        className="h-[150px] object-cover rounded-xl"
      />
      <div className="mt-3">
        <h2 className = 'font-bold text-lg'>
            {business.name}
        </h2>
        <div className = "flex items-center justify-between">
            <h2 className="text-sm text-primary">
                {business.category[0].name}
            </h2>
            <div className="flex items-center gap-2">
                <Image 
                    src="/star.png" alt="star" width={14} height={14}
                />
                <label className="text-gray-500 text-sm">{CalculateRating()}</label>
                <h2 className = "text-sm text-gray-500">{business?.restaurantType[0]}</h2>
            </div>
        </div>
      </div>

    </Link>
  )
}

export default BusinessItem
