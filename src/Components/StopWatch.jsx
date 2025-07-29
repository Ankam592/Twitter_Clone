import React, { useState } from "react";
import InputText from "./InputText";
import Button from "./Button";

const StopWatch = () => {
    const [time, setTime] = useState('00h:00m:00ss');
    const [seconds, setSeconds] = useState(0);
    const [isCounting, setIsCounting] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const borderColorChange = !isCounting ? 'border-[#000000]' : seconds%2===0 ? 'border-[#FFFFFF]' : 'border-orange-800';

    const handleStart = () => {
        let mm
        let ss = seconds
        let sec
        let min
        let hr
        if (intervalId) clearInterval(intervalId);
        setIsCounting(true)
        const id = setInterval(() => {
            ss = ss + 1;
            mm = ss / 60;
            sec = ss % 60
            min = Math.floor(mm)
            min = min % 60
            hr = mm / 60
            hr = Math.floor(hr)
            hr = hr % 24
            console.log(sec, mm)
            setTime(`${String(hr).padStart(2,'0')}h:${String(min).padStart(2,'0')}m:${String(sec).padStart(2,'0')}ss`)
            setSeconds(ss)
        }, 1000)
        setIntervalId(id)

    }
    const handlePause = () => {
        setIsCounting(false);
        clearInterval(intervalId)
    }
    const handleStop = () => {
        setTime(`00h:00m:00ss`);
        setSeconds(0)
        setIsCounting(false);
        clearInterval(intervalId)
    }
   
        return (
            <div className={`mt-20 w-1/2 h-1/2 rounded-lg border-2 ${borderColorChange} flex justify-center items-start flex-wrap bg-[#FFFFFF]`}>
                <div className="w-full h-10 flex items-center justify-center"><h1 className="font-bold">Stop Watch</h1></div>
                <div className="w-full h-1/3 flex justify-evenly items-center flex-wrap">
                    <label htmlFor="" className="">Time</label>
                    <InputText  data-testid="stopwatch-display" readOnly type='text' className={`border-1 ${borderColorChange} rounded-sm w-30 pl-2`} value={time} ></InputText>
                    

                    {!isCounting ? seconds === 0 ? <Button className='w-20 h-8 bg-blue-300 border-1 rounded-lg ' value={time} onClick={() => handleStart()}>Start</Button> : <Button className='w-20 h-8 bg-blue-300 border-1 rounded-lg ' value={time} onClick={() => handleStart()}>Resume</Button> : <Button className='w-20 h-8 bg-blue-300 border-1 rounded-lg ' value={time} onClick={() => { handlePause() }}>Pause</Button>}
                    <Button className='w-20 h-8 bg-blue-300 border-1 rounded-lg ' onClick={() => handleStop()}>Reset</Button>
                </div>

            </div>
        )
  
}

export default StopWatch;