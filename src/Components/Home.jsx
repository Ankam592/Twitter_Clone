import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Key, Sparkles } from "lucide-react";
import { Button } from "./Index";
import { Link } from "react-router-dom";

const Home = () => {
    const nav = useNavigate();
    const usr = useSelector((state) => { return state.auth.userData })
    console.log(usr)
    const [Alltweets, setAllTweets] = useState(null);

    useEffect(() => {
        const tweets = fetch('http://localhost:3000/WeatherApp/AllTweets', {
            method: 'GET',
            headers:
            {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        tweets.then((tweets) => {
            if (tweets.status >= 200 && tweets.status < 400) {
                return tweets.json().then((res) => {
                    console.log(res.Tweets)
                    setAllTweets(res.Tweets);
                    //setFiles(res.file)
                })
            }
        })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className="w-170 h-100 flex-col justify-start items-center flex-wrap ">
            <div className="relative w-full h-14 flex justify-start items-center">
                <h1 className="absolute top-4 left-4 h-10 font-bold ">Home</h1>
                <div className="absolute top-4 right-4">
                    <Sparkles size={24} className="text-[#1DA1F2]" />
                </div>
            </div>
            <div className="relative w-full h-14 flex justify-start items-center flex-wrap border-b border-1 border-blue-200 rounded-lg bg-[#FFFFFF]">

                {usr && <div className="ml-5 h-10 w-10 flex flex-wrap rounded-full items-center  bg-cover " style={{ backgroundImage: `url(http://localhost:3000/WeatherApp/uploads/${usr.filename})` }} ></div>}
                <p className="pl-5 font-bold">Whats happening?</p>

                <Link to='/tweetPage'> <Button className='absolute bottom-2 right-2  h-10 w-20 text-[#FFFFFF] bg-[#1DA1F2]  rounded-full'>Tweet</Button>
                </Link>

            </div>
            <div className="pt-2 w-full h-94 overflow-y-auto">
                {Alltweets && Alltweets.map((tweet) => {
                    const filename = tweet.filename ? tweet.filename : null
                    return <div key={tweet._id} className="bg-[#FFFFFF] shadow-sm hover:lg hover:-translate-y-1 duration-300  w-full flex flex-wrap items-center justify-start border-1 border-blue-200 rounded-lg mb-1">
                        <div className="w-13 h-full flex-col justify-start items-start">
                            <div style={{ backgroundImage: `url(http://localhost:3000/WeatherApp/uploads/${tweet.filename})` }} className=" w-10 h-10 flex justify-center items-start rounded-full bg-cover">
                            </div>

                            {/* <div style={{backgroundImage:`url(http://localhost:3000/WeatherApp/uploads/${tweet.filename})`}}  className="w-15 h-15 flex justify-center items-start rounded-full">
                            </div>
                             <div style={{backgroundImage:`url(http://localhost:3000/WeatherApp/uploads/${tweet.filename})`}} className="w-15 h-15 flex justify-center items-start rounded-full">
                            </div> */}
                        </div>
                        <div key={tweet._id} className="flex-1 w-full py-4" style={{ fontWeight: 600 }}>
                            <div className="text-[14px]  font-semibold text-[#1DA1F2]">
                                {tweet.user_Tweeted}
                            </div>
                            <div className="text-[15px]  text-[#14171A]" style={{ fontWeight: 400, lineHeight: '1.5' }}>{tweet.Content}</div>
                            {filename && <div className="h-30 w-19/20 bg-contain bg-center bg-cover" style={{ backgroundImage: `url(http://localhost:3000/WeatherApp/uploads/${tweet.filename})`, height: '10rem' }} ></div>}
                        </div>

                    </div>

                })
                }
            </div>
        </div >
    )
}


export default Home;