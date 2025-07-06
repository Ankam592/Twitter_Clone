import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputText, Button, Whisper } from "./Index";
import { useNavigate } from "react-router-dom";
import Toxicity from "../Hooks/Toxicity";


const PostTweet = () => {
    const [error, setError] = useState(null);
    const { register, formState: { errors }, handleSubmit, setValue, getValues } = useForm();
    const [formData, setformData] = useState(null);
    const [data_received_, setdatareceived] = useState('');
    const [score,setScore] = useState(0);
    const data_received = (data) => {
        data == 'delete' ? setValue('content', '') : setValue('content', data);
        setdatareceived(data);
        console.log(Toxicity(data))
      
    }
    const nav = useNavigate();
    const postTweet = (data) => {
        if (data) {
            const formdata = new FormData();
            formdata.append('image', data.image[0])
            formdata.append('content', data.content)
            setformData(formdata);
            const posttweet = fetch('http://localhost:3000/WeatherApp/postTweet', {
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
                                setTimeout(() => {
                                    nav('/');
                                }, 5000)
                            }
                        })
                }
                else {
                    setError("Something went Wrong!")
                }
            })
                .catch((err) => {
                    console.log(err)
                })
        }
        return data
    }
    return (
        <form onSubmit={handleSubmit(postTweet)}>
            <div className="w-120 h-100 border-1 border-blue-100 rounded-sm flex justify-evenly items-start flex-wrap">
                <div className="w-full h-1/4 flex justify-center items-center">
                    <h1>Tweet</h1>
                </div>
                {error && <p>{error}</p>}
                <div className="w-full h-1/4 flex justify-evenly items-center">
                    <div className="w-1/4 h-full flex justify-evenly items-center">
                        <label htmlFor="">Tweet Content</label>
                    </div>
                    <div className="relative w-3/4 h-1/2 flex justify-start border-2 rounded-lg items-center">
                    {score != 0  ?(score > 0 ? <InputText
                            type='text'
                            className="w-80 h-full bg-green-400"
                            placeholder="Please add content"
                            {...register("content", {
                                required: true,
                            })}
                        ></InputText> :<InputText
                            type='text'
                            className="w-80 h-full bg-green-400"
                            placeholder="Please add content"
                            {...register("content", {
                                required: true,
                            })}
                        ></InputText>) :<InputText
                            type='text'
                            className="w-80 h-full "
                            placeholder="Please add content"
                            {...register("content", {
                                required: true,
                            })}
                        ></InputText>}
                        <Whisper datafromvoice={data_received} ></Whisper>
                        {errors.content ? <p>{errors.content.message}</p> : null}
                    </div>
                </div>
                <div className="w-full h-1/4 flex justify-evenly items-center">
                    <div className="w-1/4 h-full flex justify-evenly items-center">
                        <label htmlFor="">Upload Image</label>
                    </div>
                    <div className="w-3/4 h-full flex justify-evenly items-center">
                        <InputText type='file' className="w-full h-1/2 border-2 rounded-lg bg-blue-400" placeholder="Please upload Image"
                            {...register("image", {
                                required: true,
                            })}></InputText>
                        {errors.image ? <p>{errors.image.message}</p> : null}
                    </div></div>
                <div className="w-full h-1/4 flex justify-center items-center">
                    <Button className="w-1/2 h-1/2 rounded-sm bg-blue-600 text-[#FFFFFF] font-bold">Submit</Button>
                </div>
            </div>
        </form>
    )
}
export default PostTweet;