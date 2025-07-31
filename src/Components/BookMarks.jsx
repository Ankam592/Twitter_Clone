import { current } from "@reduxjs/toolkit";
import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";

const BookMarks = () => {
    const user = useSelector((state) => { return state.auth.userData })
    const [email, setUser] = useState(user.email)
    console.log(user)

    const [bookmarks, setBookMarks] = useState([])
    const [AllTweets,setAllTweets] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(-1);
    const [toggle, setToggle] = useState(true);
    const [currentTweets,setCurrentTweets] = useState(bookmarks)
    const containerSize = isOpen ? 'h-140' : 'h-100';
      const API_URL = import.meta.env.VITE_API_URL;


    useEffect(() => {
        showBookmarks();
        getTweets()
    }, [])
   function getTweets() {
        const getTweets = fetch(`${API_URL}/WeatherApp/getTweets/${email}`, {            // this is to get all the users which matches with the input sent then show one by one using carousel 
            method: 'GET',
            credentials: 'include',
            headers:
            {
                "Content-Type": "application/json"
            }
        })
        getTweets.then((data) => {
            return data.json()
        }).then((res) => {
            console.log(res)
            const tweetsArr = res.Tweets;
            setAllTweets(tweetsArr)
            setCurrentTweets(tweetsArr)

        })
            .catch((error) => {
                console.log(error)
            })
    }
    const showBookmarks = async () => {
        const bookmarks = await fetch(`${API_URL}/WeatherApp/bookmarks/${email}`, {
            method: 'GET',
            headers:
            {
                'content-Type': 'application/json'
            },
            credentials: 'include'
        })

        const bookMarks = await bookmarks.json();
        if (bookmarks.status >= 200 && bookmarks.status < 400) {
            setBookMarks(bookMarks.bookMarks)
        }
        else {
            console.log('somethng went wrong!');
        }
    }



    return (
        <div className={`mt-10 w-170 min-h-100 flex-col justify-start items-center flex-wrap bg-[#FFFFFF] border-1 border-blue-200 rounded-lg`}>
            <div className="relative w-full h-14 flex justify-evenly items-center">
                <h1 className={`ml-2 absolute top-4 left-15 h-10 font-bold `}>{toggle ? "My Tweets" : 'BookMarks' }</h1>
                <div className="w-15 h-6 rounded-full border-2 border-blue-900 bg-[#FFFFFF] relative transition-all duration-500">
                <div className={`w-5 h-full bg-blue-400 rounded-full absolute left-0 transition-all duration-500 ease-in-out ${toggle ? "translate-x-9":"translate-x-0"}`} 
                onClick={()=>{setToggle(prev=>!prev),
                        setCurrentTweets(toggle ? bookmarks : AllTweets )}
                        }></div>
                   
                </div>

                <div className="absolute top-4 right-4 ">
                    {user && <div className="ml-5 h-10 w-10 flex flex-wrap rounded-full items-center  bg-cover" style={{ backgroundImage: `url(${API_URL}/WeatherApp/uploads/${user.filename})` }} ></div>}

                </div>
            </div>
            <div className="pt-2 w-full min-h-94 mr-2 ">
                {currentTweets && currentTweets.map((bookmark, idx) => {
                    return <div key={idx} className={`border-1 border-blue-300 rounded-lg pl-2  mr-2  w-full pb-1  ${index === idx ? "max-h-[500px] py-4 px-4" : "max-h-7 px-4 py-0"}   transition-all  duration-800 ease-in-out overflow-hidden  border-1 border-blue-200 mb-2 bg-blue-200`} onClick={() => {
                        setIndex(index === idx ? -1 : idx);   // if u click on already opened div means (index===idx) one then it will close as it sets -1 ; else it opens as it sets idx(index=idx)
                        //     if (index === idx) {
                        //         setIndex(-1); // Close
                        //     } else {
                        //         setIndex(idx); // Open
                        //     }
                    }}
                    >
                        {bookmark.Content}


                        {index === idx && <div key={idx} className="bg-[#FFFFFF] shadow-sm hover:lg hover:-translate-y-1 duration-300  w-full flex flex-wrap items-center justify-start  rounded-lg mb-1">
                            <div className="w-13 h-full flex-col justify-start items-start">
                                <div style={{ backgroundImage: `url(${API_URL}/WeatherApp/uploads/${bookmark.filename})` }} className="ml-2 w-8 h-8 flex justify-center items-start rounded-full bg-cover">
                                </div>
                                <div className="w-15 h-30 flex justify-center items-start rounded-full bg-[#FFFFFF]">
                                </div>
                                <div className="w-15 h-24 flex justify-center items-start rounded-full bg-[#FFFFFF]">
                                </div>
                            </div>
                            <div key={bookmark._id} className="flex-1 w-full pt-4" style={{ fontWeight: 600 }}>
                                <div className="text-[14px]  font-semibold text-[#1DA1F2]">
                                    {bookmark.user_Tweeted}
                                </div>
                                <div className="text-[15px]  text-[#14171A]" style={{ fontWeight: 400, lineHeight: '1.5' }}>{bookmark.Content}</div>
                                {bookmarks && <div className="h-30 w-19/20 bg-contain bg-center bg-cover" style={{ backgroundImage: `url(${API_URL}/WeatherApp/uploads/${bookmark.filename})`, height: '10rem' }} ></div>}

                            </div>
                        </div>}

                    </div>
                })}
            </div>
        </div >
    )
}

export default BookMarks;