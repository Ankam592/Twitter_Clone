import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/query";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { Button } from './Index';
import Api_getHook from '../Hooks/Api_getHook';


const FilterUsers = () => {
    const nav = useNavigate()
    const cur_user = useSelector((state) => { return state.auth.userData.email })
    const { input } = useParams();
    const [users, setUsers] = useState(null);
    const [index, setIndex] = useState(0);
    const [Animation, setAnimation] = useState("");
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    const [showTweets, setShowTweets] = useState(false);
    const [tweets, setTweets] = useState(null);
    const [show, setShow] = useState(true);
      const API_URL = import.meta.env.VITE_API_URL;

    const height_change = showFollowers || showFollowing || showTweets ? 'h-[490px]' : 'h-[400px]';
    useEffect(() => {
        const getUsers = fetch(`${API_URL}/WeatherApp/searchUser/${input}`, {            // this is to get all the users which matches with the input sent then show one by one using carousel 
            method: 'GET',
            credentials: 'include',
            headers:
            {
                "Content-Type": "application/json"
            }
        })
        getUsers.then((data) => {
            return data.json()
        }).then((res) => {
            console.log(res)
            const UsersArr = res.text;
            UsersArr.length == 0 ? nav('/') : null;
            console.log(UsersArr)
            setUsers(res.text)

        })
            .catch((error) => {
                console.log(error)
            })

    }, [input, index, showFollowers, showFollowing])

    const Follow = async (email) => {       // this is to send api when user clicks on follow button in person profile
        try {
            const data = await fetch(`${API_URL}/WeatherApp/follow/${email}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'Application/json'
                    },
                    credentials: 'include'
                }
            )
            const data_ = await data.json();
            console.log(data_)
            const updatedUsers = [...users]; // copy existing array
            if (!updatedUsers[index].Followers.includes(cur_user)) {
                updatedUsers[index].Followers = [...updatedUsers[index].Followers, cur_user];            // using email you follow that person in backend and come back here and using curuser email add the user in followers list
            }

            setUsers(updatedUsers);
             toast.success("started Following!", {
                            icon: "🚀",
                            className: "custom-toast-success",
                            style: {
                                backgroundColor: "#1DA1F2",
                                color: "#FFFFFF",
                                fontWeight: "bold",
                                height:'20px',
                            },
                        });


        }
        catch (err) {
            console.log(err)
        }
    }
    const UnFollow = async (email) => {       // this is to send api when user clicks on follow button in person profile
        try {
            const data = await fetch(`${API_URL}/WeatherApp/unfollow/${email}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'Application/json'
                    },
                    credentials: 'include'
                }
            )
            const data_ = await data.json();
            console.log(data_)
            console.log(users)
            const updatedUsers = [...users]; // copy existing array
            const currentFollowers = updatedUsers[index].Followers;
            const currentFollowing = updatedUsers[index].Following;


            // Properly remove cur_user from the followers list but if we use splice it will just delete in place and also with map it deleted and keeps undefined in emptty slot
            updatedUsers[index].Followers = currentFollowers.filter(
                follower => follower !== cur_user
            );

            updatedUsers[index].Following = currentFollowing.filter(
                following => following !== cur_user
            );
            setUsers(updatedUsers);
             toast.success("unFollowed!", {
                            icon: "🚀",
                            className: "custom-toast-success",
                            style: {
                                backgroundColor: "#1DA1F2",
                                color: "#FFFFFF",
                                fontWeight: "bold",
                                height:'20px',
                            },
                        });




        }
        catch (err) {
            console.log(err)
        }
    }

    function Prev() {
        setAnimation('animate-slideOutRight'); // its to move to left user by applying spesific anmation
        setShow(false);
        setShowTweets(false)                       // dont show the user here as animation is started

        setTimeout(() => {                       // its animation time 
            setIndex((Prev) => Prev - 1);        // decrease index so that left user will appear using users[index]
            setAnimation('animate-slideInLeft');  // now as user is changed then get that user animation
            setShow(true);                       // now show the new user(left)
        }, 500);
    }
    function Next() {
        setAnimation('animate-slideOutRight')
        setShow(false)
        setShowTweets(false)
        setTimeout(() => {
            setIndex((Prev) => Prev + 1)

            setAnimation('animate-slideInLeft')
            setShow(true)
        }, 500)
    }
    function getTweets(email) {
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
            setShowTweets(true)
            setTweets(tweetsArr)
            setShowFollowers(false)
            setShowFollowing(false)

        })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div className={`mt-6 w-full ${height_change} flex flex-col justify-between items-center border border-blue-200 rounded-md p-4 bg-[#FFFFFF]`}>
            {users && users.length > 0 && show && (<> <div className="relative w-full h-3/4 flex justify-center items-center  border-b pb-5">
                <div
                    className={`w-3/4 h-full absolute flex flex-col items-center gap-4 ${Animation}`}    // calling the animation state which is written in prev and next functions
                >
                    <div className="text-xl font-bold">
                        {users[index]?.username}
                    </div>
                    <div className="text-xs underline font-semibold">
                        {users[index].Followers?.includes(cur_user) ? <p className="italic">Congratulations! you are following {users[index]?.username}</p> : <p className="italic"> Vibe with the tweets? Time to follow {users[index]?.username} </p>}

                    </div>
                    <div
                        className="w-25 h-25 rounded-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${API_URL}/WeatherApp/uploads/${users[index]?.filename})`, // sending here api directly to get image from files table using uploads/filename route (it is a middleware)
                        }}
                    ></div>
                    <div className="text-xl font-semibold">
                        {users[index]?.bio}
                    </div>
                    <div className=" w-full h-8 flex justify-evenly items-start mb-1">
                        {showFollowers ? <div className="w-1/4 h-full bg-[#FFFFFF] flex justify-center items-center border-1 rounded-lg text-[#000000]" onClick={() => setShowFollowers(false)} >Hide</div> : <div className="w-1/4 h-full bg-[#000000] flex justify-center items-center border-1 rounded-lg text-[#FFFFFF]" onClick={() => { setShowFollowers(true); setShowFollowing(false); setShowTweets(false) }} >Followers {users && users[index]?.Followers.length}</div>}

                        {showFollowing > 0 ? <div className="w-1/4 h-full bg-[#FFFFFF] flex justify-center items-center border-1 rounded-lg text-[#000000]" onClick={() => setShowFollowing(false)} >Hide</div> : <div className="w-1/4 h-full bg-[#000000] flex justify-center items-center border-1 rounded-lg text-[#FFFFFF]" onClick={() => { setShowFollowing(true); setShowFollowers(false); setShowTweets(false) }} >Following {users && users[index]?.Following.length}</div>}
                        {showTweets ? <div className="w-1/4 h-full bg-[#FFFFFF] flex justify-center items-center border-1 rounded-lg text-[#000000]" onClick={() => setShowTweets(false)}>Hide</div> : <div className="w-1/4 h-full bg-[#000000] flex justify-center items-center border-1 rounded-lg text-[#FFFFFF]" onClick={() => getTweets(users[index].email)}>Tweets</div>}

                        {!users[index].Followers.includes(cur_user) ? <button className='w-1/4 h-full bg-[#1DA1F2] border-1 rounded-lg text-[#FFFFFF] disabled:opacity-50' disabled={users[index]?.email === cur_user} onClick={() => Follow(users[index]?.email)}>Follow
                        </button> : <button className='w-1/4 h-full bg-[#000000] border-1 rounded-lg text-[#FFFFFF] disabled:opacity-50' disabled={users[index]?.email === cur_user} onClick={() => UnFollow(users[index]?.email)}>UnFollow
                        </button>}
                    </div>

                </div>


            </div>
                {(showFollowers) && <div className="relative w-19/20 border-1 border-blue-200 h-30 rounded-lg   max-h-[30rem] overflow-y-scroll scrollbar-hide bg-[#F0F8FF] rounded-shadow flex flex-wrap">
                    <div className="w-full h-10 flex justify-center items-center" > <h1 className="">Followers List</h1></div>
                    {users[index].Followers.length > 0 ? users[index].Followers?.map((follower, index) => {
                        return <div className="w-full flex justify-right items-center mb-1 border-1 border-blue-200 rounded-lg ">
                            <div key={index} className="h-5 w-2/3  bg-[#FFFFFF]"><p className="pl-1 text-xs italic font-normal ">{follower}</p></div>
                            <div className="relative h-5 flex-1 flex-col justify-center bg-[#FFFFFF] items-right flex-wrap"><FaUserCircle className="absolute right-1 text-black-500">.</FaUserCircle> </div></div>
                    }) : <div className="w-full flex justify-right items-center mb-1 border-1 border-blue-200 rounded-lg ">
                            <div key={index} className="h-5 w-2/3  bg-[#FFFFFF]"><p className="pl-1 text-xs italic font-normal ">No Followers Dont Worry! </p></div>
                </div>}
                </div>}


                {(showFollowing) && <div className="relative w-19/20 border-1 border-blue-200 h-30 rounded-lg   max-h-[30rem] overflow-y-scroll scrollbar-hide bg-[#F0F8FF] rounded-shadow flex flex-wrap">
                    <div className="w-full h-10 flex justify-center items-center" > <h1 className="">Following List</h1></div>
                    {users[index].Following && users[index].Following?.map((following, index) => {
                        return <div className="w-full flex justify-right items-center mb-1 border-1 border-blue-200 rounded-lg ">
                            <div key={index} className="h-5 w-2/3  bg-[#FFFFFF]"><p className="pl-1 text-xs italic font-normal ">{following}</p></div>
                            <div className="relative h-5 flex-1 flex-col justify-center bg-[#FFFFFF] items-right flex-wrap"><FaUserCircle className="absolute right-1 text-black-500">.</FaUserCircle> </div></div>
                    })}
                </div>}
                {(showTweets) && <div className="relative w-19/20 border-1 border-blue-200 h-30 rounded-lg   max-h-[30rem] overflow-y-scroll scrollbar-hide bg-[#F0F8FF] rounded-shadow flex flex-wrap">


                    <div className="w-full h-10 flex justify-center items-center" > <h1 className="">Tweets List</h1></div>
                    {tweets && tweets?.map((tweet, idx) => {
                        return <div className="w-full flex justify-right items-center mb-1 border-1 border-blue-200 rounded-lg ">
                            <div key={idx} className="h-5 w-full  bg-[#FFFFFF]"><p className="pl-1 text-xs italic font-normal ">{tweet.Content}</p></div>
                            <div className="relative h-5 flex-1 flex-col justify-center bg-[#FFFFFF] items-right flex-wrap"><FaUserCircle className="absolute right-1 text-black-500"></FaUserCircle> </div></div>
                    })}
                </div>
                }
                {/* Buttons */}
                {users && <div className="w-full h-1/4 flex justify-center gap-4 items-center mt-4">
                    <button
                        className="bg-[#1DA1F2] text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={Prev}
                        disabled={index === 0 || showTweets}
                    >
                        Prev
                    </button>
                    <button
                        className="bg-[#1DA1F2] text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={Next}
                        disabled={index === users.length - 1 || showTweets}
                    >
                        Next
                    </button>
                </div>}
            </>)}
        </div>
    );


}

export default FilterUsers;