import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Key, Sparkles } from "lucide-react";
import { Button, InputText } from "./Index";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaRegCommentDots, FaUserCircle, FaCog } from 'react-icons/fa';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import Toxicity from '../Hooks/Toxicity';

import throttle from 'lodash/throttle';
import { toast } from "react-toastify";

const Home = () => {
    const nav = useNavigate();
    const usr = useSelector((state) => { return state.auth.userData })
    const [Alltweets, setAllTweets] = useState([]);
    const [enableComments, setEnableComments] = useState(null);
    const [comments, setComments] = useState(null)
    const [likes, setLikes] = useState(0)
    const [bookMark, setBookmark] = useState(0);
    const [page, setPage] = useState(1)
    const [hasMore, sethasMore] = useState(true);
    const [toxic, setToxicity] = useState(false);
    const [toxicQuery,setToxicQuery] = useState('');
    const [toxicScore,setToxicScore] = useState(0);
    const API_URL = import.meta.env.VITE_API_URL;

    const scrollRef = useRef(null);
    const limit = 2
    const isFetching = useRef(false);

    useEffect(() => {
        fetchTweets();
    }, [page])

    useEffect(()=>
    {
        
         const timer = setTimeout(()=>
        {
            console.log('triggered',toxicQuery);
            toxicQuery.length > 0 && checkToxicity(toxicQuery)  
          
        },500)
        return () => clearTimeout(timer);
    },[toxicQuery])



    const fetchTweets = async () => {
        if (hasMore && !isFetching.current) {
            isFetching.current = true
            // we are checking if we move to bottom of the scroll bar then only send API
            const res = await fetch(`${API_URL}/WeatherApp/AllTweets?page=${page}&limit=${limit}`, {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            if (res.status == 200) {
                const json = await res.json();
                const Tweets = json.Tweets || [];
                // if (Tweets.length < limit) {
                //     sethasMore(false)
                // }
                setAllTweets((prev) => [...prev, ...Tweets]);
                isFetching.current = false
            }
        }
    }

    const hasScrolled = throttle((e) => {
        const container = e.target;
        const scrollY = container.scrollTop;
        const innerHeight = container.clientHeight;
        const scrollHeight = container.scrollHeight;

        if (scrollY + innerHeight >= scrollHeight - 100 && hasMore) {
            setPage(prev => prev + 1);
        }
    }, 500)

    const Engage = async (tweetContent) => {
        try {
            const id = tweetContent.Tweet_ID;
            console.log(tweetContent.actionType)

            const addComment = await fetch(`${API_URL}/WeatherApp/engage/${id}`, {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(tweetContent)
            })
            const engageDetails = await addComment.json();
            if (tweetContent.actionType === 'like') {
                let tempTweets = [...Alltweets];
                console.log('Updated Tweet:', engageDetails.engage);
                tempTweets = tempTweets.map((tweet) => {
                    return tweet._id === engageDetails.engage._id ? engageDetails.engage : tweet
                })
                setLikes((prev) => prev + 1)
                setAllTweets(tempTweets)
                toast.success(`you liked tweet`, {
                    icon: "🚀",
                    className: "custom-toast-success",
                    style: {
                        backgroundColor: "#1DA1F2",
                        color: "#FFFFFF",
                        fontWeight: "bold",
                        height: '20px',
                    },
                });
            }
            else if (tweetContent.actionType === 'comment') {
                setEnableComments(id)
                setComments(engageDetails.engage.Comments.reverse())

            }
            else if (tweetContent.actionType === 'bookmark') {
                setBookmark((prev) => prev + 1)
                let tempTweets = [...Alltweets];
                console.log('Updated Tweet:', engageDetails.engage);
                tempTweets = tempTweets.map((tweet) => {
                    return tweet._id === engageDetails.engage._id ? engageDetails.engage : tweet
                })
                setAllTweets(tempTweets)
                toast.success(`you bookmarked the tweet`, {
                    icon: "🚀",
                    className: "custom-toast-success",
                    style: {
                        backgroundColor: "#1DA1F2",
                        color: "#FFFFFF",
                        fontWeight: "bold",
                        height: '20px',
                    },
                });
            }
            else if (tweetContent.actionType === 'deleteBookmark') {
                let tempTweets = [...Alltweets];
                console.log('Updated Tweet:', engageDetails.engage);
                tempTweets = tempTweets.map((tweet) => {
                    return tweet._id === engageDetails.engage._id ? engageDetails.engage : tweet
                })
                setAllTweets(tempTweets)
                toast.success(`you deleted the BookMarked Tweet`, {
                    icon: "🚀",
                    className: "custom-toast-success",
                    style: {
                        backgroundColor: "#1DA1F2",
                        color: "#FFFFFF",
                        fontWeight: "bold",
                        height: '20px',
                    },
                });
            }
            else {
                setLikes(prev => prev - 1);
                let tempTweets = [...Alltweets];
                console.log('Updated Tweet:', engageDetails.engage);
                tempTweets = tempTweets.map((tweet) => {
                    return tweet._id === engageDetails.engage._id ? engageDetails.engage : tweet
                })
                setAllTweets(tempTweets)
                toast.success(`disliked`, {
                    icon: "🚀",
                    className: "custom-toast-success",
                    style: {
                        backgroundColor: "#1DA1F2",
                        color: "#FFFFFF",
                        fontWeight: "bold",
                        height: '20px',
                    },
                });
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const sendComment = async (cur, id) => {
        try {
            console.log(cur)
            console.log(toxic)
            const commentadded = await fetch(`${API_URL}/WeatherApp/addComment/${id}`, {
                method: 'POST',
                headers:
                {
                    'content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ 'curcomment': cur, 'toxic': toxic , 'toxicScore' : toxicScore })

            })
            if (commentadded.status >= 200 && commentadded.status < 400) {
                const addcom = await commentadded.json();
                console.log(addcom)
                Engage({ 'actionType': 'comment', 'Tweet_ID': addcom.tweetId })
               // !toxic && setToxicQuery('');
                toast.success(`${addcom.message}`, {
                    icon: "🚀",
                    className: "custom-toast-success",
                    style: {
                        backgroundColor: "#FFFFFF",
                        color: "#000000",
                        height: '20px',
                    },
                });


            }
            else {
                console.log(`status : ${commentadded.status} , Some thing went Wrong!`)
                toast.error("Error while commenting!", {
                    icon: "🚀",
                    className: "custom-toast-success",
                    style: {
                        backgroundColor: "#CD500C",
                        color: "#FFFFFF",
                        fontWeight: "bold",
                        height: '20px',
                    },
                });
            }
        }
        catch (err) {
            console.log(err)
        }

    }
    const checkToxicity =async (comment) => {
        
        const toxicity =await  Toxicity(comment);
        console.log(toxicity);
        if (toxicity > 0.8) {
            setToxicity(true);
            setToxicScore(toxicity)
        }
        else
        {
            setToxicity(false);
             setToxicScore(toxicity)
        }

    }
    return (
        <div className=" h-full w-full flex-col justify-start items-center flex-wrap ">
            <div className="relative w-full h-14 flex justify-start items-center">
                <h1 className="absolute top-4 left-4 h-10 font-bold ">Home</h1>
                <div className="absolute top-4 right-4">
                    <Sparkles size={24} className="text-[#1DA1F2]" />
                </div>
            </div>
            <div className="relative w-full h-14 flex justify-start items-center flex-wrap border-b border-1 border-blue-200 rounded-lg bg-[#FFFFFF]">
                {usr && <div className="ml-5 h-10 w-10 flex flex-wrap rounded-full items-center  bg-cover" style={{ backgroundImage: `url(${API_URL}/WeatherApp/uploads/${usr.filename})` }} ></div>}
                <p className="pl-5 font-bold">Whats happening?</p>
                <Link to='/tweetPage'> <Button className='absolute bottom-2 right-2  h-10 w-20 text-[#FFFFFF] bg-[#1DA1F2]  rounded-full'>Tweet</Button>
                </Link>

            </div>
            <div ref={scrollRef} onScroll={(e) => hasScrolled(e)} className="pt-2 w-full h-100 overflow-y-auto">
                {Alltweets && Alltweets.map((tweet, idx) => {
                    const filename = tweet.filename ? tweet.filename : null
                    return <div key={idx} className="         bg-[#FFFFFF] shadow-sm hover:lg hover:-translate-y-1 duration-300  w-auto flex flex-wrap items-center justify-start border-1 border-blue-200 rounded-lg mb-1">
                        <div className="w-13 h-full flex-col justify-start items-start">
                            <div style={{ backgroundImage: `url(https://twitterclone-node1.onrender.com/WeatherApp/uploads/${tweet.filename})` }} className="ml-2 w-8 h-8 flex justify-center items-start rounded-full bg-cover">
                            </div>
                            <div className="w-15 h-30 flex justify-center items-start rounded-full bg-[#FFFFFF]">
                            </div>
                            <div className="w-15 h-24 flex justify-center items-start rounded-full bg-[#FFFFFF]">
                            </div>
                        </div>
                        <div key={tweet._id} className="flex-1 w-full pt-4" style={{ fontWeight: 600 }}>
                            <div className="text-[14px]  font-semibold text-[#1DA1F2]">
                                {tweet.user_Tweeted}
                            </div>
                            <div className="text-[15px]  text-[#14171A]" style={{ fontWeight: 400, lineHeight: '1.5' }}>{tweet.Content}</div>
                            {filename && <div className="h-30 w-19/20 bg-contain bg-center bg-cover" style={{ backgroundImage: `url(${API_URL}/WeatherApp/uploads/${tweet.filename})`, height: '10rem' }} ></div>}
                            <div className="my-1 w-full h-10  flex justify-evenly items-center">
                                {tweet.likes.includes(usr.email) ?
                                    <Button className="w-20 h-2/3  flex justify-center items-center border-1 rounded-lg transition-transform duration-400 ease-in-out scale-125 text-[#1DA1F2]" onClick={() => Engage({ 'actionType': 'deleteLike', 'Tweet_ID': tweet._id, 'email': usr.email })}><FaHeart className='text-red-500'></FaHeart></Button>
                                    : <Button className="w-20 h-2/3 transition-transform duration-400 ease-in-out scale-100 flex justify-center items-center border-1 rounded-lg text-[#1DA1F2]" onClick={() => Engage({ 'actionType': 'like', 'Tweet_ID': tweet._id, 'email': usr.email })}><FaHeart className='text-blue-500'></FaHeart></Button>}

                                <Button className="w-25 h-2/3 bg-[#1DA1F2] flex justify-center items-center border-1 rounded-lg text-[#FFFFFF]" onClick={() => Engage({ 'actionType': 'comment', 'Tweet_ID': tweet._id, 'email': usr.email })} >Comments</Button>
                                {tweet.user_Tweeted === usr.email && <FaCog className="w-25 h-1/2  flex justify-center text-sm items-center   rounded-lg text-[#1DA1F2]" onClick={() => { nav(`/editTweet/${tweet._id}`) }}>
                                </FaCog>}
                                {tweet.bookMarks.includes(usr.email) ?
                                    <Button className="w-20 h-1/2     flex justify-center items-center border-1 rounded-lg transition-transform duration-400 ease-in-out scale-125 text-[#1DA1F2]" onClick={() => Engage({ 'actionType': 'deleteBookmark', 'Tweet_ID': tweet._id, 'email': usr.email })}><BsBookmarkFill className="h-3/4 text-[#1DA1F2]"></BsBookmarkFill></Button>
                                    : <Button className="w-20 h-1/2  transition-transform duration-400 ease-in-out scale-100 flex justify-center items-center border-1 rounded-lg text-[#1DA1F2]" onClick={() => Engage({ 'actionType': 'bookmark', 'Tweet_ID': tweet._id, 'email': usr.email })}><BsBookmark className='h-3/4 text-[#1DA1F2]'></BsBookmark></Button>}

                            </div>
                            {(enableComments && enableComments === tweet._id) && <div className="relative w-19/20 border-1 border-blue-200 h-30 rounded-lg   max-h-[30rem] overflow-y-scroll scrollbar-hide bg-[#F0F8FF] rounded-shadow flex flex-wrap">
                                <div className="relative flex justify-center w-full mb-1" ><h1 className="font-normal text-[#1DA1F2]">Comments Section</h1>
                                    <Button className='absolute right-1 w-18 h-6 bg-[#1DA1F2] rounded-lg text-[#FFFFFF]' onClick={() => setEnableComments(null)}>Close </Button> </div>
                                <div className="relative flex justify-center items-center w-full" >
                                    <InputText type='text' className="  mb-2  w-full h-6 border-1 border-blue-200 bg-[#FFFFFF] rounded-sm text-sm font-normal" placeholder='Add Comment' value={toxicQuery} onChange={(e) => setToxicQuery(e.target.value)}></InputText>
                                    {toxicQuery  && <Button className='w-20 h-6 bg-[#1DA1F2] rounded-lg text-[#FFFFFF]' onClick={() => sendComment(toxicQuery, tweet._id)}>Submit </Button>} </div>


                                {comments && comments?.map((comment, index) => {
                                    return <div className="w-full flex justify-right items-center mb-1 border-1 border-blue-200 rounded-lg ">
                                        <div key={index} className="h-5 w-2/3  bg-[#FFFFFF]"><p className="pl-1 text-xs italic font-normal ">{comment.comment}</p></div>
                                        <div className="relative h-5 flex-1 flex-col justify-center bg-[#FFFFFF] items-right flex-wrap"><FaUserCircle className="absolute right-1 text-blue-500">.</FaUserCircle> </div></div>
                                })}


                            </div>}
                        </div>
                    </div>
                })
                }
            </div>
        </div >
    )

}
export default Home;