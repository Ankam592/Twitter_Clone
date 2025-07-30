import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputText, Button, Whisper } from "./Index";
import { useNavigate, useParams } from "react-router-dom";
import Toxicity from "../Hooks/Toxicity";
import { toast } from "react-toastify";

const PostTweet = ({ tweet }) => {
    const [formData, setformData] = useState(null);
    const [data_received_, setdatareceived] = useState('');
    const [score, setScore] = useState(0);
    const [oldImage, setOldImage] = useState(tweet?.filename || null);
    const [newImage, setNewImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState(null);
    const [toxic, setToxicity] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
    const { register, formState: { errors }, handleSubmit, setValue, getValues } = useForm(
        {
            defaultValues:
            {
                content: tweet?.Content || ''
            }

        }
    );

    const data_received = (data) => {
        data == 'delete' ? setValue('content', '') : setValue('content', data);
        setdatareceived(data);
        const toxic = Toxicity(data);
        if (toxic) {
            setToxicity(true);
        }

    }
    const nav = useNavigate();
    const postTweet = (data) => {
        if (tweet) {
            const formdata = new FormData();
            formdata.append('content', data.content);
            formdata.append('toxic', toxic);
            if (data.image && data.image.length > 0) {
                formdata.append('image', data.image[0]);
            } else {
                formdata.append('existed_file', oldImage); // Send separately
            }

            console.log(formdata)
            const posttweet = fetch(`${API_URL}/WeatherApp/editTweet/${tweet._id}`, {
                method: 'POST',
                credentials: 'include',
                body: formdata
            })
            posttweet.then((data_) => {
                if (data_.status > 200 && data_.status < 400) {
                    return data_.json()
                        .then((res) => {
                            {
                                setError("Successfully Edited the Tweet")
                                toast.success("Successfully Edited the Tweet", {
                                    icon: "🚀",
                                    className: "custom-toast-success",
                                    style: {
                                        backgroundColor: "#1DA1F2",
                                        color: "#FFFFFF",
                                        fontWeight: "bold",
                                        height: '20px',
                                    },
                                });
                                setTimeout(() => {
                                    nav('/');
                                }, 5000)
                            }
                        })
                }
                else {
                    setError("Something went Wrong!")
                    toast.error("Error while Editing the Tweet!", {
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
            })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            if (data) {
                const formdata = new FormData();
                formdata.append('image', data.image[0])
                formdata.append('content', data.content)
                formdata.append('toxic', toxic);
                setformData(formdata);
                const posttweet = fetch(`${API_URL}/WeatherApp/postTweet`, {
                    method: 'POST',
                    credentials: 'include',
                    body: formdata
                })
                posttweet.then((data_) => {
                    if (data_.status > 200 && data_.status < 400) {
                        return data_.json()
                            .then((res) => {
                                {
                                    setError("Successfully Posted the Tweet")
                                    toast.success("Successfully Posted the Tweet", {
                                        icon: "🚀",
                                        className: "custom-toast-success",
                                        style: {
                                            backgroundColor: "#1DA1F2",
                                            color: "#FFFFFF",
                                            fontWeight: "bold",
                                            height: '20px',
                                        },
                                    });
                                    setTimeout(() => {
                                        nav('/');
                                    }, 5000)
                                }
                            })
                    }
                    else {
                        setError("Something went Wrong!")
                        toast.error("Error while Posting the Tweet!", {
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
                })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
        return data
    }
    return (
        <form onSubmit={handleSubmit(postTweet)}>
            <div className="mt-15 w-170 h-100 border-1 border-blue-200 rounded-lg bg-[#FFFFFF] flex justify-evenly items-start flex-wrap">
                <div className="w-full h-1/8 flex justify-center items-center">
                    <p className="font-bold">Tweet</p>
                </div>
                {error && <p>{error}</p>}
                <div className="w-full h-1/4 flex justify-evenly items-center">
                    <div className="w-1/4 h-full flex justify-evenly items-center">
                        <label htmlFor="">Tweet Content</label>
                    </div>
                    <div className="relative w-1/2 h-1/2 flex justify-start border-2 rounded-lg items-start">
                        <InputText
                            type='text'
                            className="w-60 h-full"
                            placeholder="Please add content"
                            {...register("content", {
                                required: true,
                            })}
                        ></InputText>
                        <Whisper datafromvoice={data_received} ></Whisper>
                        {errors.content ? <p>{errors.content.message}</p> : null}
                    </div>
                </div>
                <div className="w-full h-1/4 flex justify-evenly items-center">
                    <div className="w-1/4 h-full flex justify-evenly items-center">
                        <label htmlFor="">Upload Image</label>
                    </div>
                    <div className="w-1/2 h-full flex justify-evenly items-center">
                        <InputText type='file'
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setPreviewImage(URL.createObjectURL(file));
                                }
                                else {
                                    if (tweet?.filename) {
                                        setPreviewImage(`${API_URL}/WeatherApp/uploads/${tweet.filename}`)
                                    }
                                }
                            }}
                            className="w-full h-1/2 border-2 rounded-lg " placeholder="Please upload Image"
                            {...register("image", {
                            })}></InputText>
                        {errors.image ? <p>{errors.image.message}</p> : null}
                    </div>
                    {previewImage && <img src={previewImage} alt="preview"></img>}
                    {/* <div className="w-1/4 h-full flex justify-evenly items-center bg-cover" style={{ backgroundImage: `url(http://localhost:3000/WeatherApp/uploads/${data.image[0]})` }}>  </div> */}
                </div>
                <div className="w-full h-1/4 flex justify-center items-center">
                    <Button className="w-1/3 h-1/2 rounded-lg bg-[#1DA1F2] text-[#FFFFFF] font-bold">Submit</Button>
                </div>
            </div>
        </form>
    )
}
export default PostTweet;