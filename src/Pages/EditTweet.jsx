import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostTweet from "../Components/PostTweet";


const EditTweet = () => {
    const [tweet, setTweets] = useState(null);
    const { slug } = useParams();
    console.log(slug)
    const nav = useNavigate();
    useEffect(() => {
        if (slug) {
            const tweet = fetch(`http://localhost:3000/WeatherApp/getTweetbyId/${slug}`, {
                method: 'GET',
                credentials: 'include',
                headers:
                {
                    'Content-Type': 'application/json'
                }
            })
            tweet.then((res) => {
                return res.json()
            }).then((data) => {
                console.log(data)
                setTweets(data.Tweets)
            }).catch((err) => {
                console.log(err)
            })
        }
        else {
            console.log('hello')
            nav('/')
        }
    }, [slug, nav])
    return tweet ? (
        <div className="py-8">
            <PostTweet tweet={tweet} />
        </div>
    ) : null
}

export default EditTweet;