import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/query";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Button } from './Index';
import Api_getHook from '../Hooks/Api_getHook';


const FilterUsers = () => {
    const cur_user = useSelector((state) => { return state.auth.userData.email })
    const { input } = useParams();
    const [users, setUsers] = useState([]);
    const [index, setIndex] = useState(0);
    const [Animation, setAnimation] = useState("");
    const [show, setShow] = useState(true);
    useEffect(() => {
        const getUsers = fetch(`http://localhost:3000/WeatherApp/searchUser/${input}`, {            // this is to get all the users which matches with the input sent then show one by one using carousel 
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
            console.log(UsersArr)
            setUsers(res.text)

        })
            .catch((error) => {
                console.log(error)
            })

    }, [input,index])

    const Follow = async (email) => {       // this is to send api when user clicks on follow button in person profile
        try {
            const data = await fetch(`http://localhost:3000/WeatherApp/follow/${email}`,
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
                updatedUsers[index].Followers = [...updatedUsers[index].Followers, cur_user];
            }

           setUsers(updatedUsers);
           

        }
        catch (err) {
            console.log(err)
        }
    }
    const UnFollow = async (email) => {       // this is to send api when user clicks on follow button in person profile
        try {
            const data = await fetch(`http://localhost:3000/WeatherApp/unfollow/${email}`,
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
            const currentFollowers = updatedUsers[index].Followers;

        // Properly remove cur_user from the followers list but if we use splice it will just delete in place and also with map it deleted and keeps undefined in emptty slot
        updatedUsers[index].Followers = currentFollowers.filter(
            follower => follower !== cur_user
        );

            setUsers(updatedUsers);
            


        }
        catch (err) {
            console.log(err)
        }
    }

    function Prev() {
        setAnimation('animate-slideOutRight'); // its to move to left user by applying spesific anmation
        setShow(false);                        // dont show the user here as animation is started

        setTimeout(() => {                       // its animation time 
            setIndex((Prev) => Prev - 1);        // decrease index so that left user will appear using users[index]
            setAnimation('animate-slideInLeft');  // now as user is changed then get that user animation
            setShow(true);                       // now show the new user(left)
        }, 500);
    }
    function Next() {
        setAnimation('animate-slideOutRight')
        setShow(false)
        setTimeout(() => {
            setIndex((Prev) => Prev + 1)

            setAnimation('animate-slideInLeft')
            setShow(true)
        }, 500)
    }
    return (
        <div className="mt-5 w-[600px] h-[400px] flex flex-col justify-between items-center border border-blue-200 rounded-md p-4 bg-blue-100">

            {/* User Profile Section */}
            <div className="relative w-full h-3/4 flex justify-center items-center  border-b pb-5">
                {users.length > 0 && show && (
                    <div
                        className={`w-3/4 h-full absolute flex flex-col items-center gap-4 ${Animation}`}    // calling the animation state which is written in prev and next functions
                    >
                        <div className="text-xl font-bold">
                            {users[index]?.username}
                        </div>
                         <div className="text-xs underline font-semibold">
                                                    {users[index].Followers.includes(cur_user) ? <p className="italic">Congratulations! you are following {users[index]?.username}</p> : <p className="italic"> Vibe with the tweets? Time to follow {users[index]?.username} </p> }

                        </div>
                        <div
                            className="w-25 h-25 rounded-full bg-cover bg-center"
                            style={{
                                backgroundImage: `url(http://localhost:3000/WeatherApp/uploads/${users[index]?.filename})`, // sending here api directly to get image from files table using uploads/filename route (it is a middleware)
                            }}
                        ></div>
                        <div className="text-xl font-semibold">
                            {users[index]?.bio}
                        </div>
                        <div className=" w-full h-8 flex justify-evenly items-start mb-1">
                            <div className="w-1/5 h-full bg-[#00264d] flex justify-center items-center border-1 rounded-lg text-[#FFFFFF]">Followers {users && users[index]?.Followers.length}</div>
                            <div className="w-1/5 h-full bg-[#00264d] flex justify-center items-center border-1 rounded-lg text-[#FFFFFF]">Following</div>
                            <div className="w-1/5 h-full bg-[#00264d] flex justify-center items-center border-1 rounded-lg text-[#FFFFFF]">Tweets</div>

                            {!users[index].Followers.includes(cur_user) ? <button className='w-1/5 h-full bg-[#00264d] border-1 rounded-lg text-[#FFFFFF] disabled:opacity-50' disabled={users[index]?.email === cur_user}  onClick={() => Follow(users[index]?.email)}>Follow
                            </button> : <button className='w-1/5 h-full bg-[#00264d] border-1 rounded-lg text-[#FFFFFF] disabled:opacity-50'  disabled={users[index]?.email === cur_user} onClick={() => UnFollow(users[index]?.email)}>UnFollow
                            </button>}



                        </div>
                    </div>
                )}
            </div>

            {/* Buttons */}
            <div className="w-full h-1/4 flex justify-center gap-4 items-center mt-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={Prev}
                    disabled={index === 0 }
                >
                    Prev
                </button>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={Next}
                    disabled={index === users.length - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );


}

export default FilterUsers;