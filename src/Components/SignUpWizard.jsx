import React, { useId, useState } from "react";
import { useForm } from "react-hook-form";



const SignUpWizard = () => {
    const { register, handleSubmit, getValues } = useForm();
    const [page, setPage] = useState(0);
    const [error, setError] = useState(null);
    const nameId = useId();
    const EmailId = useId();
    const passwordId = useId();
    const conpasswordId = useId();
    const ageId = useId();
    const GenderId = useId();
    function signUp(data) {
        
        console.log(data)
        const {name,email,password,conpassword,age,gender} = data;
        alert(`Input Form is successfully submitted \n Name : ${name }  \n Email : ${email }  \n Password : ${password }  \n Confirm Password : ${conpassword }  \n Age : ${age }  \n Gender : ${gender }`)
    }

    return (
        <div className="mt-7 w-110 h-90 bg-blue-200 border-1 border-blue-400 rounded-lg flex justify center items-center transition-all duration-500 ease-in-out flex-wrap">
            <form onSubmit={handleSubmit(signUp)}>
                <div className="mt-7 w-109 h-60 bg-blue-200 rounded-lg flex justify center items-center transition-all duration-500 ease-in-out flex-wrap">

                    <div className="w-full h-7 flex justify-center "><h1>SignUp Form Wizard</h1></div>
                    <div className="w-full h-7  flex justify-center ">{error && <p className="text-red-900">{error} </p>}</div>
                    {page === 0 && <div className="w-full h-50 pb-10 flex flex-wrap justify-evenly items-center ">
                        <div className="relative w-full h-7 flex flex-wrap justify-evenly items-center ">
                            <label className='absolute left-15 w-1/2 h-full' htmlFor={nameId}>Name</label>
                            <input id={nameId} type="text"
                                className="absolute right-5 w-1/2 h-full border-1 p-1 rounded-sm"
                                placeholder="Please enter your name"
                                {...register('name', {
                                    required: true
                                })} />

                        </div>
                        <div className="relative w-full h-7   flex flex-wrap justify-evenly items-center ">
                            <label className='absolute left-15 w-1/2 h-full' htmlFor={EmailId}>Email</label>
                            <input id={EmailId} type="email"
                                className="absolute right-5 w-1/2 h-full border-1 p-1 rounded-sm"
                                placeholder="Please enter email"
                                {...register('email', {
                                    required: true
                                })} />
                        </div>
                    </div>
                    }
                    {page === 1 && <div className="w-full h-50 flex pb-10 flex-wrap justify-evenly items-center ">
                        <div className="relative w-full h-7 flex flex-wrap justify-evenly items-center ">
                            <label className='absolute left-15 w-1/2 h-full' htmlFor={passwordId}>Password</label>
                            <input id={passwordId} type="password"
                                className="absolute right-5 w-1/2 h-full border-1 p-1 rounded-sm"
                                placeholder="Please enter password"
                                {...register('password', {
                                    required: true
                                })} />
                        </div>
                        <div className="relative w-full h-7 flex flex-wrap justify-evenly items-center ">
                            <label className='absolute left-15 w-1/2 h-full ' htmlFor={conpasswordId}>Confirm Password</label>
                            <input id={conpasswordId} type="password"
                                className="absolute right-5 w-1/2 h-full border-1 p-1 rounded-sm"
                                placeholder="Please enter password again"
                                {...register('conpassword', {
                                    required: true
                                })} />
                        </div>
                    </div>
                    }
                    {page === 2 && <div className="w-full h-50 flex pb-10  flex-wrap justify-evenly items-center ">
                        <div className="relative w-full h-7 flex flex-wrap justify-evenly items-center ">
                            <label className='absolute left-15 w-1/2 h-full ' htmlFor={ageId}>Age</label>
                            <input id={ageId} type="text"
                                className="absolute right-5 w-1/2 h-full border-1 p-1 rounded-sm"
                                placeholder="Please enter your age"
                                {...register('age', {
                                    required: true
                                })} />
                        </div>
                        <div className="relative w-full h-7 flex flex-wrap justify-evenly items-center ">
                            <label className='absolute left-15 w-1/2 h-full ' htmlFor={GenderId}>Gender</label>
                            <input id={GenderId} type="text"
                                className="absolute right-5 w-1/2 h-full border-1 p-1 rounded-sm"
                                placeholder="Please enter Gender"
                                {...register('gender', {
                                    required: true
                                })} />
                        </div>
                        <button type="submit" className="bg-blue-400 border-1 text-[#FFFFFF]  rounded-sm">Submit</button>
                    </div>
                    }

                </div>
            </form>
            <div className="w-full h-7 flex justify-evenly items-center ">
                <button className="bg-blue-400 w-15 h-7 text-[#FFFFFF] disabled:opacity-50 rounded-sm " onClick={() => { setPage(prev => prev - 1) }}

                    disabled={page === 0}
                >PREV
                </button>
                <button className="bg-blue-400 w-15 h-7 text-[#FFFFFF] disabled:opacity-50 rounded-sm " onClick={() => {
                    page === 0 ? getValues('name') && getValues('email') ?( setPage(prev => prev + 1), setError(null) ) : setError('Please Enter name and email') : getValues('password') && getValues('conpassword') ? (setPage(prev => prev + 1), setError(null)) : setError('Please Enter password and confirm Passowrd')

                }} disabled={page === 2}
                >NEXT
                </button>

            </div>
        </div>

    )
}

export default SignUpWizard;