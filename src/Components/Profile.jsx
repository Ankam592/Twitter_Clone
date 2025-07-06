import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../store/AuthSlice";
export const Profile = () => {
    const dispatch = useDispatch();
    const [profiledata, setProfiledata] = useState(null);
    const [filedata ,setfiledata] = useState(null);
    const email_ = useSelector((state) => { return state.auth.userData?.email })
    const usrdata = (email_) => {
        const userdata = fetch(`http://localhost:3000/WeatherApp//userProfile/${email_}`, {
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
        const file = fetch('http://localhost:3000/WeatherApp/profilePic', {
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

    return (
        <div className="w-160 h-100 mt-6 border-1 border-blue-200 rounded-lg flex flex-wrap justify-center items-start">
            <div className="w-full h-50 flex flex-wrap justify-start items-evenly">
                <div className=" w-full h-30 bg-[url('/bg.avif')] border-1">
                   {profiledata ?  <div className=" bg-cover ml-5 mt-5 w-30 h-30  rounded-full" style={{backgroundImage : `url(http://localhost:3000/WeatherApp/uploads/${profiledata[0].filename})`}}></div> : <p>Loading</p>}
                </div>
                <div className="relative mt-5 w-full h-8  flex justify-end items-center flex-wrap ">
                    <div className="w-1/4 absolute left-1 text-sm h-full flex justify-center items-center">
                        {profiledata ? <p>{profiledata[0].username}</p> : <p>Loading</p>}</div>
                    <div className=" w-80 absolute right-0 text-sm text-[#FFFFFF] h-full flex justify-evenly items-center ">
                        <label htmlFor="file-upload" className="pl-2 pr-2 bg-[#00264d] h-full ">Edit Profile Pic</label>
                        <input id="file-upload" type="file" className="w-50 h-full text-[#000000] hidden" onChange={(e) => uploadPic(e.target.files[0])} /></div>
                        {filedata && <p>{filedata.message}</p>}
                </div>

                <div className="w-full h-5 flex justify-start items-start">
                    <div className="text-sm ml-1 w-2/5 h-full  flex justify-center items-center">
                        {profiledata ? <p>{profiledata[0].email}</p> : <p>Loading</p>}</div>
                </div>
            </div>
            <div className="w-full h-1/2  flex-col flex-wrap justify-center items-start">
                <div className="ml-5 w-full h-40  ">
                    {profiledata ? <p>{profiledata[0].bio}</p> : <p>Loading</p>}
                </div>
                <div className=" w-full h-8 flex justify-evenly items-start">
                    <div className="w-1/5 h-full bg-[#00264d] flex justify-center items-center border-1 rounded-lg text-[#FFFFFF]">Followers</div>
                    <div className="w-1/5 h-full bg-[#00264d] flex justify-center items-center border-1 rounded-lg text-[#FFFFFF]">Following</div>
                    <div className="w-1/5 h-full bg-[#00264d] flex justify-center items-center border-1 rounded-lg text-[#FFFFFF]">Tweets</div>

                    <div className="w-1/5 h-full bg-[#00264d] flex justify-center items-center border-1 rounded-lg text-[#FFFFFF]">Profile Pic</div>
                </div>
            </div>

        </div>
    )
}