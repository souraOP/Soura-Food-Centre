"use client"

import React, { useEffect, useState, useRef } from "react";
import GlobalApi from "../_utils/GlobalApi";
import Image from "next/image";
import { CircleChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CategoryList() {
    const listRef = useRef(null);
    // 3. for getting the list of categories
    const [categoryList, setCategoryList] = useState([]);

    // 4. we want to keep the selected category
    const params = useSearchParams();

    // 5. we want to store the selected category in some state
    const [selectedCategory, setSelectedCategory] = useState('All'); // by default selected to all categories

    // when the parameter value gets changed this useEffect will be called
    useEffect(() => {
        // console.log(params.get('category')) // only the name of the food category will be shown
        setSelectedCategory(params.get('category'));
    }, [params])

    // 2. we have to call the get categories using useEffect
    useEffect(()=>{
        getCategoriesList();
    }, [])


    // 1. for getting the cateogries list
    const getCategoriesList = () => {
        // we need to get the categories from globalAPI
        // since that was a Promise we can use .then() to get the response
        GlobalApi.GetCategory().then(res => {
            console.log(res.categories);
            setCategoryList(res.categories);
        })
    }

    const ScrollRightHandler = () => {
        if(listRef.current){
            listRef.current.scrollBy({
                left: 200,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className = 'mt-10 relative'>
            <div className='flex gap-5 overflow-auto no-scrollbar' ref = {listRef}>
                {categoryList && categoryList.map((category, index) => (
                    <Link 
                        href={'?category=' + category.slug}  
                        key={index} 
                        className={`flex flex-col gap-2 items-center p-2 border rounded-xl min-w-28 hover:border-primary hover:bg-red-100 cursor-pointer group
                        ${selectedCategory==category.slug&&'text-primary border-primary bg-red-50 shadow-md'}
                    `}>
                        {/* for showing the icon of the food category first */}
                        <div className = "w-16 h-16 flex items-center justify-center mb-2">
                            <Image 
                                src = {category.icon?.url} 
                                alt={category.name} 
                                width={70} 
                                height={60}
                                className="object-contain group-hover:scale-125 transition-all duration-200"
                            />
                        </div>
                        {/* adding the category name */}
                        <h2 className="text-sm font-bold text-center w-full group-hover:text-primary">
                            {category.name}
                        </h2>
                    </Link>
                ))}
            </div>
            <CircleChevronRight className= "-right-10 top-10 absolute bg-red-400 rounded-full text-white h-8 w-8 cursor-pointer" 
                onClick = {() => ScrollRightHandler()}
            />
        </div>
    )
}
