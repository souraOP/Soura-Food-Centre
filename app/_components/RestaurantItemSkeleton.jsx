import React from 'react'

function RestaurantItemSkeleton() {
  return (
    <div >
        <div className = "h-[150px] w-full bg-slate-200 rounded-xl mt-5 animate-pulse">
            
        </div>
        <div className = "w-full bg-slate-200 h-5 mt-3 rounded-md animate-pulse">

        </div>
    </div>
  )
}

export default RestaurantItemSkeleton
