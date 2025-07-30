import React, { useState } from "react";
import { InputText, Button } from "./Index";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
    const [Error, setError] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const dispatch = useDispatch();
    const API_URL = import.meta.env.VITE_API_URL;
    const nav = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(Email, Password);
        if (Email == '' && Password == '') {
            setError('Please enter email and password to login!')
        }
        const data = {
            email: Email,
            Password: Password
        }
        console.log(data)
        const res = await fetch(`${API_URL}/WeatherApp/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        });
        console.log(res.status)
        if (res.status == 200) {
            toast.success("LoggedIn Successfully!", {
                icon: "🚀",
                className: "custom-toast-success",
                style: {
                    backgroundColor: "#1DA1F2",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    height:'20px',
                },
            });
            const data1 = await res.json();
            dispatch(login({
                email: Email,
                password: Password,
                filename: data1.user.filename
            }))
            nav('/');
        }
        else {
            const data1 = await res.json();
            if (data1) {
                setError(data1.error);
                toast.error("Error while Logging In!", {
                icon: "🚀",
                className: "custom-toast-success",
                style: {
                    backgroundColor: "#CD500C",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    height:'20px',
                },
            });
            }

        }

    }




    return (
        <form onSubmit={handleSubmit}>
            <div className="mt-5 flex-col w-120 h-85 border-1 border-blue-400 rounded-lg bg-blue-200 justify-start flex-wrap items-center">
                <div className="w-full h-15 flex justify-center bg-blue-200 text-[#1DA1F2] font-bold text-xl rounded-sm items-center">Login</div>
                <p className="w-full text-[#1DA1F2] text-xs flex italic font-bold justify-center">Don't have an account, Please <Link className="underline" to="/signupPage"> &nbsp;SignUp</Link></p>
                {Error && <p className="w-full  pt-5  text-[#F21202] text-xs flex italic justify-center " >{Error}</p>}
                <div className="mt-5 w-full h-60 flex flex-wrap justify-center items-start">
                    <div className="w-full h-15 flex justify-center items-start ">
                        <div className="w-50 h-full flex justify-center items-center ">
                            <label className='pl-8 mb-1 w-1/2 h-1/2 font-bold' htmlFor=""> Email :</label></div>
                        <div className="w-65 h-full flex justify-start items-center ">
                            <InputText
                                className=" pl-2 mb-2 w-full h-7 italic bg-white-900"
                                placeHolder='Please enter Email'
                                type="text"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            /></div>
                    </div>
                    <div className="mb-10 w-full h-15 flex justify-center items-center ">
                        <div className="w-50 h-full flex justify-center items-center ">
                            <label className='pl-20 mb-1  w-full h-1/2 font-bold' htmlFor=""> Password :</label></div>
                        <div className="w-65 h-full flex justify-start items-center ">
                            <InputText
                                className="pl-2 mb-3 w-full h-7 italic bg-white-900"
                                placeHolder='Please enter Password'
                                type="password"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            /></div>
                    </div>
                    <Button className='mb-10 w-30 h-10 bg-[#1DA1F2] text-[#FFFFFF] rounded-lg' type='submit'>Submit</Button>
                </div>

            </div>
        </form>
    )
}


export default Login;