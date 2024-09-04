import Image from 'next/image'
import React from 'react'
import { Rating as ReactRating } from '@smastrom/react-rating'
import moment from 'moment'

function ReviewList({reviewList}) {
  return (
    <div className = "flex flex-col gap-6">
      { reviewList ? reviewList.map((review, index) => (
        <div key={index} className = "flex items-center gap-6 border rounded-xl p-5">
            <Image 
                src = {review.profileImg} alt = {'profileImg'} width = {50} height = {50}
                className = "rounded-full"
            />
            <div>
                <h2 className = "text-sm"><span className = "font-bold">{review.userName}</span>  <span className = "text-xs text-slate-500">{moment(review.publishedAt).format('DD-MMM-yyyy')}</span></h2>
                <ReactRating style={{ maxWidth: 100 }} value={review.star} isDisabled = {true}/>
                <h2 className = "mt-2">{review.reviewText}</h2>
            </div>
        </div>
      ))
    :
    [1, 2, 3, 4].map((item, index) => (
        <div className = "h-[100px] w-full bg-slate-300 animate-pulse rounded-lg">

        </div>
    ))
    }
    </div>
  )
}

export default ReviewList
