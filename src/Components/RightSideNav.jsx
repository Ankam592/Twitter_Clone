import React from "react";
import { useSelector } from "react-redux";
import { TrendingCard,SearchBox } from "./Index";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

export const RightSideNav = () => {
    const IsAuthenticated = useSelector((state)=> {return state.auth.isAuthenticated })


    const TrendingItems = [
        {
            name: '#Breaking News',
            no_of_tweets: 125000,
            tweeting: 5688
        },
        {
            name: '#World News',
            no_of_tweets: 105000,
            tweeting: 5689
        },
        {
            name: '#Breaking News',
            no_of_tweets: 178000,
            tweeting: 5677
        },
        {
            name: '#GOAT',
            no_of_tweets: 12998000,
            tweeting: 56889
        },
        {
            name: '#GOAT',
            no_of_tweets: 1299000,
            tweeting: 56889
        }
    ]
    return (
        <div className="pt-5 w-full h-full flex-col justify-center flex-wrap items-center">
            {IsAuthenticated &&  <div className="mb-1 h-8 w-full flex justify-evenly items-center border-blue-200 rounded-sm">
                <SearchBox type ='text' className='pl-1 w-full h-8 border-1 border-blue-300 rounded-sm bg-[#FFFFFF]' placeholder='Search By Name'></SearchBox>
                
                
            </div>}
            <div className="pl-2 font-bold rounded-t-lg w-full h-8 text-[#000000] bg-[#F0F8FF]  ">Trends for you</div>
            <div className="w-full max-h-106 overflow-y-auto rounded-b-lg items-center bg-[#FFFFFF] border-1 border-blue-200 rounded-lg">
            <TrendingCard   className="  w-full h-28 flex justify-start  flex-wrap  bg-white-800" Trending_Obj={TrendingItems}>
            </TrendingCard>
            </div>

        </div>
    )
}