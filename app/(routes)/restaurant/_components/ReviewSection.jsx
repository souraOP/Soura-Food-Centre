import {React, useState, useEffect} from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Rating as ReactRating } from '@smastrom/react-rating'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'
import ReviewList from './ReviewList'


function ReviewSection({restaurantDetails}) {
    const {user} = useUser();
    useEffect(() => {
        restaurantDetails && getReviewList();
    }, [restaurantDetails])
    // from react-rating library
    const [rating, setRating] = useState(0)

    // 1. saving the review text in useState
    const [reviewText, setReviewText] = useState();

    // 3. saving the review list
    const [reviewList, setReviewList] = useState();
    // 2. handleSubmit button
    const handleSubmit = () => {
        const data = {
            email: user.primaryEmailAddress.emailAddress,
            profileImage: user?.imageUrl,
            userName: user?.fullName,
            reviewText: reviewText,
            star: rating,
            restaurantSlug: restaurantDetails.slug
        };

        GlobalApi.AddNewReview(data).then(res => {
            // console.log(res);
            toast("Review Added !");

            // adding this so that review gets updated immediately
            res && getReviewList();
        })
    }

    // display the list of review
    const getReviewList = () => {
        GlobalApi.GetRestaurantReviewList(restaurantDetails.slug).then(res => {
            // console.log(res);
            setReviewList(res?.reviews)
        })
    }

  return (
    <div className = "grid grid-cols-1 md:grid-cols-3 mt-10 gap-10">
      <div className = "flex flex-col gap-2 p-5 rounded-lg shadow-lg border">
        <h2 className = "font-bold text-lg">
            Apnar Review din
        </h2>
        <ReactRating style={{ maxWidth: 100 }} value={rating} onChange={setRating} />
        <Textarea onChange={(e)=>setReviewText(e.target.value)} />
        {/* disable the submit button until and unless there is either any review text or rating given by the user */}
        <Button variant="outline" disabled={rating==0 || !reviewText}
            onClick={()=> handleSubmit()}
        >Submit</Button>
      </div>
      <div className = "col-span-2">
        <ReviewList reviewList = {reviewList}/>
      </div>
    </div>
  )
}

export default ReviewSection