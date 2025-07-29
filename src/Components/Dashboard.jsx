import React, { useEffect, useState } from "react";
import Piechart from "./PieChart";

const Dashboard = () => {
    const [comments, setComments] = useState([]);
    const [toxicCount, setToxicCount] = useState(0);
    useEffect(() => {
        Comments();
    }, [])

    const Comments = async () => {
        const getCommentsData = await fetch('http://localhost:3000/WeatherApp/AllComments', {
            method: 'GET',
            headers:
            {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        const comment = await getCommentsData.json();
        if (getCommentsData.status >= 200 && getCommentsData.status < 400) {
            console.log(comment)
            const Allcomments = comment.comments
            setComments(Allcomments.reverse())
            let toxiccount = 0
            Allcomments.map((comment) => {
                comment.toxicScore > 0.75 && toxiccount++
            })
            setToxicCount(toxiccount)
            console.log(toxiccount)
            
        }
    }


    return (
        <div className=" m-3 w-full h-130 flex justify-center items-start flex-wrap">
            <div className="w-full h-7 m-3 flex justify-center items-center">
                <h1 className="font-bold text-[20px]">Dashboard(Analysis of Toxic Comments)</h1>
            </div>
            <div className="w-full h-110 flex justify-center items-start flex-wrap ">
                <div className="h-50 w-full flex justify-center items-start flex-wrap " >
                    <div className="px-4 h-full w-2/3 flex justify-center items-start flex-wrap border-1 border-blue-200 rounded-lg bg-[#FFFFFF]">

                        <div className="w-full flex flex-wrap justify-center border-b border-blue-200 pb-1 font-bold">
                            <div className="pl-1 w-1/2 ">
                                <h1>Recent Comments</h1>
                            </div>
                            <div className="w-1/4  ">
                                <h1>Toxicity</h1>
                            </div>
                            <div className="w-1/4">
                                <h1>Status</h1>
                            </div>
                        </div>
                        {comments && comments.slice(0, 5).map((comment, idx) => {

                            return <> <div className="w-full flex justify-evenly flex-wrap " key={idx}>

                                <div className="pl-2 w-1/2 h-full ">
                                    {
                                        comment.comment
                                    }
                                </div>
                                <div className="w-1/4  h-full">
                                    {
                                        comment.toxicScore.toFixed(2)
                                    }
                                </div>
                                <div className="w-1/4  h-full ">
                                    {
                                        comment.toxicScore > 0.75 ? 'Blocked' : 'Allowed'
                                    }
                                </div>
                            </div>
                            </>
                        })}

                    </div>
                    <div className=" h-full w-1/2 flex justify-center items-start flex-wrap "></div>
                </div>
                <div className="mt-5 w-full h-50 flex justify-evenly items-start flex-wrap  " >
                    <div className=" h-full w-4/10 flex justify-center items-start flex-wrap border-blue-200 border-1 rounded-lg bg-[#FFFFFF]">

                        <div className="pt-1 w-full h-7 flex flex-wrap justify-center  font-bold">
                            <h1>Summary</h1>
                        </div>
                        <div className="w-full h-38 flex justify-center flex-wrap items-evenly ">
                            <div className="w-full h-1/2 flex justify-center flex-wrap  pt-2">
                                <div className="w-full h-1/3 flex justify-center flex-wrap">
                                    <h1 className="font-bold text-[20px]">{comments.length}</h1>
                                </div>
                                <div className="w-full  h-1/2 flex justify-center flex-wrap">
                                    <h1 className="text-[16px]">Total Comments</h1>
                                </div>
                            </div>
                            <div className="w-full  h-1/2 flex justify-evenly flex-wrap">
                                <div className="w-1/2 h-full">
                                    <div className="w-full h-1/3 flex justify-center flex-wrap">
                                        <h1 className="font-bold text-[20px]">{toxicCount / (comments.length).toFixed(2) * 100}%</h1>
                                    </div>
                                    <div className="w-full  h-2/3 flex justify-end flex-wrap items-center">
                                        <h1 className=" text-[16px]">Toxic  Comments</h1>
                                    </div>
                                </div>
                                <div className="w-1/2 h-full">
                                    <div className="w-full h-1/3 flex justify-center flex-wrap">
                                        <h1 className="font-bold text-[20px]">{comments.length - toxicCount}</h1>
                                    </div>
                                    <div className="w-full  h-2/3 flex justify-center flex-wrap items-center">
                                        <h1 className="text-[16px]">Allowed </h1>
                                    </div>
                                </div>

                            </div>
                        </div>



                    </div>
                    <div className="h-full w-4/10 flex justify-center items-start flex-wrap  rounded-lg border-blue-200 border-1 rounded-lg bg-[#FFFFFF]">
                        <div className="w-full h-30 flex justify-center flex-wrap items-evenly ">
                         {toxicCount ? <Piechart toxic= {toxicCount} NonToxic = {comments.length-toxicCount} className='flex justify-center items-center'></Piechart> : <h1>Loading...</h1>}   

                    </div>



                </div>
                

            </div>

        </div>
        </div >

    )

}

export default Dashboard;