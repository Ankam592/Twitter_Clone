import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../store/AuthSlice";
import { FaUserCircle } from "react-icons/fa";

export const Profile = () => {
    const dispatch = useDispatch();
    const [profiledata, setProfiledata] = useState(null);
    const [filedata ,setfiledata] = useState(null);
    const [showFollowers , setShowFollowers] = useState(false)
    const [showFollowing , setShowFollowing] = useState(false)
    const [showTweets,setShowTweets] = useState(false)
    const [Tweets,setTweets] = useState(null);
    const height_change = showFollowers || showFollowing || showTweets ? 'h-120' : 'h-80'
     const API_URL = import.meta.env.VITE_API_URL;

    const email_ = useSelector((state) => { return state.auth.userData?.email })
    const usrdata = (email_) => {
        const userdata = fetch(`${API_URL}/WeatherApp//userProfile/${email_}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
        userdata.then((ud) => {
            return ud.json()
        })
            .then((res) => {
                console.log(res.exuser[0])
                setProfiledata(res.exuser[0])
            })
            .catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        if (!email_) return;
        console.log('inside ')
        usrdata(email_)
    }, [email_])
    useEffect(() => {
        if (profiledata && profiledata[0]) {
            console.log("Updated profiledata:", profiledata[0].username);
        }
    }, [profiledata]);

    const uploadPic = (val) => {
        val["email"] = email_
        const filedata_ = new FormData();
        filedata_.append('image', val)
        filedata_.append('content', email_);
        const file = fetch(`${API_URL}/WeatherApp/profilePic`, {
            method: 'POST',
            credentials: 'include',
            body: filedata_
        })

        file.then((res) => {
            if (res.status >= 200 && res.status < 400) {
                return res.json().then((data) => {
                    console.log(data)
                   setfiledata(data.message)
                   dispatch(login({
                    email : email_,
                    filename : data.user.filename
                   }))
                   usrdata(email_)
                })
            }
            else
            {
                setfiledata('upload failed!')
            }
        }).catch((err) => {
            console.log(err)
        })
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
        <div className={`mt-6 w-full max-w-[600px] ${height_change}  border-1 border-blue-200 rounded-lg flex flex-wrap justify-center items-start bg-[#FFFFFF]`}>
            <div className="w-full h-50 rounded-lg flex flex-wrap justify-start items-evenly ">
                <div className="rounded-t-lg  w-full h-30 bg-[url('/bg.avif')] ">
                   {profiledata ?  <div className=" bg-cover ml-5 mt-5 w-30 h-30  rounded-full" style={{backgroundImage : `url(${API_URL}/WeatherApp/uploads/${profiledata[0].filename})`}}></div> : <p>Loading</p>}
                </div>
                <div className="relative mt-5 w-full h-8  flex justify-end items-center flex-wrap bg-[#FFFFFF]">
                    <div className="absolute left-1 w-1/4 text-sm h-full flex justify-center items-center">
                        {profiledata ? <p className="font-bold ">{profiledata[0].username}</p> : <p>Loading</p>}</div>
                    <div className=" w-80 text-sm text-[#FFFFFF] h-full flex justify-evenly items-center ">
                        <label htmlFor="file-upload" className="pl-2 pr-2 bg-[#00264d] h-full rounded-sm ">Edit Profile Pic</label>
                        <input id="file-upload" type="file" className="w-50 h-full text-[#000000] hidden" onChange={(e) => uploadPic(e.target.files[0])} /></div>
                        {filedata && <p>{filedata.message}</p>}
                </div>

                <div className="w-full h-5 flex justify-start items-start">
                    <div className="text-sm ml-1 w-2/5 h-full  flex justify-center items-center">
                        {profiledata ? <p className="font-semibold">{profiledata[0].email}</p> : <p>Loading</p>}</div>
                </div>
                 <div className="pt-2 ml-5 w-full h-1/3  ">
                    {profiledata ? <p>{profiledata[0].bio}</p> : <p>Loading</p>}
                </div>
            </div>
            <div className="w-full h-10  flex-col flex-wrap justify-center items-start ">
               
                <div className=" w-full h-full  flex justify-evenly items-start">
                        {showFollowers ? <div className="w-1/6 h-full bg-[#FFFFFF] flex justify-center items-center border-1 rounded-lg text-[#000000]" onClick={() => setShowFollowers(false)} >Hide</div> : <div className="w-1/6 h-full bg-[#00264d] flex justify-center items-center border-1 rounded-lg text-[#FFFFFF]" onClick={() => { setShowFollowers(true); setShowFollowing(false) ;setShowTweets(false)}} >Followers {profiledata && profiledata[0]?.Followers.length}</div>}

                        {showFollowing > 0 ? <div className="w-1/6 h-full bg-[#FFFFFF] flex justify-center items-center border-1 rounded-lg text-[#000000]" onClick={() => setShowFollowing(false)} >Hide</div> : <div className="w-1/6 h-full bg-[#00264d] flex justify-center items-center border-1 rounded-lg text-[#FFFFFF]" onClick={() => { setShowFollowing(true); setShowFollowers(false);setShowTweets(false) }} >Following {profiledata && profiledata[0]?.Following.length}</div>}

                 {showTweets ? <div className="w-1/6 h-full bg-[#FFFFFF] flex justify-center items-center border-1 rounded-lg text-[#000000]" onClick={()=>setShowTweets(false)} >Hide</div>:  <div className="w-1/6 h-full bg-[#00264d] flex justify-center items-center border-1 rounded-lg text-[#FFFFFF]" onClick={()=>getTweets(profiledata[0].email)} >Tweets</div>}

                </div>
            </div>
            
 {(showFollowers) && <div className="relative w-19/20 border-1 border-blue-200 h-30 rounded-lg   max-h-[30rem] overflow-y-scroll scrollbar-hide bg-[#F0F8FF] rounded-shadow flex flex-wrap">
                    <div className="w-full h-10 flex justify-center items-center" > <h1 className="">Followers List</h1></div>
                    {profiledata[0].Followers && profiledata[0].Followers?.map((follower,index) => {
                        return <div className="w-full flex justify-right items-center mb-1 border-1 border-blue-200 rounded-lg ">
                            <div key={index} className="h-5 w-2/3  bg-[#FFFFFF]"><p className="pl-1 text-xs italic font-normal ">{follower}</p></div>
                            <div className="relative h-5 flex-1 flex-col justify-center bg-[#FFFFFF] items-right flex-wrap"><FaUserCircle className="absolute right-1 text-black-500">.</FaUserCircle> </div></div>
                    })}
                </div>}
                {(showFollowing) && <div className="relative w-19/20 border-1 border-blue-200 h-30 rounded-lg   max-h-[30rem] overflow-y-scroll scrollbar-hide bg-[#F0F8FF] rounded-shadow flex flex-wrap">
                    <div className="w-full h-10 flex justify-center items-center" > <h1 className="">Following List</h1></div>
                    {profiledata[0].Following && profiledata[0].Following?.map((following,index) => {
                        return <div className="w-full flex justify-right items-center mb-1 border-1 border-blue-200 rounded-lg ">
                            <div key={index} className="h-5 w-2/3  bg-[#FFFFFF]"><p className="pl-1 text-xs italic font-normal ">{following}</p></div>
                            <div className="relative h-5 flex-1 flex-col justify-center bg-[#FFFFFF] items-right flex-wrap"><FaUserCircle className="absolute right-1 text-black-500">.</FaUserCircle> </div></div>
                    })}
                </div>}
                 {(showTweets) && <div className="relative w-19/20 border-1 border-blue-200 h-30 rounded-lg   max-h-[30rem] overflow-y-scroll scrollbar-hide bg-[#F0F8FF] rounded-shadow flex flex-wrap">
                
                
                                    <div className="w-full h-10 flex justify-center items-center" > <h1 className="">Tweets List</h1></div>
                                    {Tweets && Tweets?.map((tweet, idx) => {
                                        return <div className="w-full flex justify-right items-center mb-1 border-1 border-blue-200 rounded-lg ">
                                            <div key={idx} className="h-5 w-full  bg-[#FFFFFF]"><p className="pl-1 text-xs italic font-normal ">{tweet.Content}</p></div>
                                            <div className="relative h-5 flex-1 flex-col justify-center bg-[#FFFFFF] items-right flex-wrap"><FaUserCircle className="absolute right-1 text-black-500"></FaUserCircle> </div></div>
                                    })}
                                </div>
                                }

        </div>
    )
}