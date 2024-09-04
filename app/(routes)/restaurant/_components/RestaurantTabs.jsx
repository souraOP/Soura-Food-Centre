import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MenuTabs from './MenuTabs'
import ReviewSection from './ReviewSection'
import AboutSection from './AboutSection'


function RestaurantTabs({restaurantDetails}) {
  return (
    <Tabs defaultValue="category" className="w-full mt-10 justify-end items-end">
  <TabsList>
    <TabsTrigger value="category">Category</TabsTrigger>
    <TabsTrigger value="about">About</TabsTrigger>
    <TabsTrigger value="reviews">Reviews</TabsTrigger>
  </TabsList>
  <TabsContent value="category">
    <MenuTabs restaurantDetails = {restaurantDetails}/>
  </TabsContent>
  <TabsContent value="about">
    <AboutSection restaurantDetails={restaurantDetails}/>
  </TabsContent>
  <TabsContent value="reviews">
    <ReviewSection restaurantDetails={restaurantDetails} />
  </TabsContent>
</Tabs>

  )
}

export default RestaurantTabs
