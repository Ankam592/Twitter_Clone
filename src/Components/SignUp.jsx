import React, { useState } from "react";
import { Button, InputText } from "./Index";
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const SignUp = () => {
    const [Error, setError] = useState('');
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const API_URL = import.meta.env.VITE_API_URL;
    const data = {};

    const signup = async (data) => {
        console.log(data);
        if (data) {
            try {
                const res = await fetch(`${API_URL}/WeatherApp/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ data })
                });
                console.log(res);
                if (res.ok) {
                    alert("User registered successfully");
                    toast.success('User Signed Up Successfully')
                    const data1 = await res.json();
                  //  console.log(data1);
                    nav('/loginPage');
                } else {
                    const data1 = await res.text();
                   console.log(data1);
                   const parsed = JSON.parse(data1);
                   if(parsed)
                   {
                    setError(parsed.message)
                    toast.error('some thing went wrong!')
                   }
                }

            } catch (err) {
                console.error("Signup error:", err);
                alert("Something went wrong!");
            }
        }
        return data;

    }


    return (
        <form onSubmit={handleSubmit(signup)}>
            <div className="mt-5 flex-col w-full h-95 border-1 border-blue-400 rounded-lg bg-blue-200 justify-start flex-wrap items-center">
                <div className="w-full h-20 flex justify-center bg-blue-200 text-[#1DA1F2] font-bold text-xl rounded-sm items-center">SignUp</div>
                <p className="w-full text-[#1DA1F2] text-xs flex font-bold italic justify-center">Already had an account, Please <Link className="underline" to="/loginPage">&nbsp;Login</Link></p>
                {Error && <p className="w-full text-[#F21202] text-xs flex italic justify-center" >{Error}</p>}
                <div className="mt-5 flex-col justify-evenly items-center  flex-wrap h-80">
                    <div className=" w-150 h-15 flex justify-evenly items-evenly">
                        <div className="w-1/2 h-10 flex justify-center ">
                            <div className="w-1/2 h-full flex justify-start items-center ">
                                <label className='pl-10 mb-1 w-full h-1/2 font-bold' htmlFor=""> Username    :</label></div>
                            <div className="w-1/2 h-full flex justify-start items-center ">
                                <InputText
                                    className=" pl-2 w-19/20 h-7 text-xs italic bg-white-900"
                                    placeHolder='Please enter Username'
                                    type="text"
                                    {...register('username', {
                                        required: true
                                    })}
                                /></div>
                        </div>
                        <div className="w-1/2 h-10 flex justify-center ">
                            <div className="w-1/2 h-full flex justify-start items-center ">
                                <label className=' mb-1 w-full h-1/2 font-bold' htmlFor="">Email Address :</label></div>
                            <div className="w-1/2 h-full flex justify-start items-center flex-wrap">
                                <InputText
                                    className=" pl-2  w-19/20 h-7 italic text-xs bg-white-900"
                                    placeHolder={errors.email ? 'Email is required' : 'Please enter Email'}
                                    type="text"
                                    {...register('email', {
                                        required: true,
                                        pattern: {
                                            value: /^\S+@\S+\.\S+$/,
                                            message: "Email address must be a valid Address"

                                        }
                                    })} />
                                {errors.email && <p className="text-xs">{errors.email.message}</p>}

                            </div>

                        </div>

                    </div>
                    <div className=" w-150 h-20 flex justify-evenly items-evenly">


                        <div className="w-70 h-10 flex justify-center ">
                            <div className="w-1/2 h-full flex justify-start items-center ">
                                <label className='pl-10 mb-1 w-full h-1/2 font-bold' htmlFor=""> Password :</label></div>
                            <div className="w-1/2 h-full flex justify-start items-center flex-wrap">
                                <InputText
                                    className=" pl-2 w-19/20 h-7 italic text-xs bg-white-900"
                                    placeHolder={errors.password ? 'Password is required' : 'Please enter Password'}
                                    type="password"
                                    {...register('Password',
                                        {
                                            required: true,
                                            pattern:
                                            {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/,
                                                message: "Please enter Valid Password"
                                            }
                                        }
                                    )}
                                />{errors.Password && <p className="text-xs">{errors.Password.message}</p>}
                            </div>
                        </div>
                        <div className="w-80 h-10 flex justify-center ">
                            <div className="w-1/2 h-full flex justify-center items-center ">
                                <label className=' mb-1 w-full h-1/2 font-bold' htmlFor=""> Confirm Password :</label></div>
                            <div className="w-1/2 h-full flex justify-start items-center flex-wrap ">
                                <InputText
                                    className=" pl-2  w-19/20 h-7 italic text-xs bg-white-900"
                                    placeHolder={errors.confirmPassword ? 'Password is required' : 'Please enter Password'}
                                    type="password"
                                    {...register('confirmPassword',
                                        {
                                            required: true,
                                            pattern:
                                            {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/,
                                                message: "Please enter Valid Password"
                                            }
                                        }
                                    )}
                                />{errors.confirmPassword && <p className="text-xs">{errors.confirmPassword.message}</p>}</div>
                        </div>
                    </div>
                    <div className=" w-150 h-15 flex justify-evenly items-evenly">
                        <div className="w-1/2 h-10 flex justify-center ">
                            <div className="w-1/2 h-full flex justify-start items-center ">
                                <label className='pl-10 mb-1 w-full h-1/2 font-bold' htmlFor=""> Bio  :</label></div>
                            <div className="w-1/2 h-full flex justify-start items-center ">
                                <InputText
                                    className=" pl-2 w-19/20 h-7 text-xs italic bg-white-900"
                                    placeHolder='Please enter Bio'
                                    type="text"
                                    {...register('bio', {
                                        required: true
                                    })}
                                /></div>
                        </div>
                        
                    </div>
                    <div className=" w-150 h-15 mt-5 flex justify-evenly items-evenly">
                        <div className="w-full h-10 flex justify-center ">
                            <Button className=' w-60 self-end h-10 bg-[#1DA1F2] text-[#FFFFFF] rounded-lg' type='submit'>Submit</Button>                      </div>
                    </div>
                </div>
            </div>
        </form>
    )
} 