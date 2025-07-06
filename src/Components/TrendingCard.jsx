import { CalendarDateRangeIcon } from "@heroicons/react/16/solid";
import React from "react";

export const TrendingCard = ({
    className = '',
    Trending_Obj,
    ...Props
}) => {
    return (
        <>
            {
                Trending_Obj.map((item) => {
                    return (
                        <div key={item.no_of_tweets}
                            className={className}>
                            <p className="pl-2 pt-1 w-50 text-xs text-gray-500  align-self:center">Trending Worldwide </p>
                            <h5 className="pl-2 w-50 text-base md:text-lg font-semibold text-gray-900">{item.name}</h5>
                            <p className="pl-2 w-50 text-xs text-gray-600">{item.no_of_tweets} Tweets</p>
                            <p className="pl-2 w-50 text-xs text-gray-600">{item.tweeting} people are Tweeting about this</p>
                        </div>
                    )   
                })
            }
        </>
    )
}