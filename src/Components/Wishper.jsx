import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { FaCheck } from "react-icons/fa";



const Whisper = ({ datafromvoice }) => {
    const [transcript, setTranscript] = useState("");
    const listeningref = useRef(false);
    const recognitionRef = useRef(null);

    const startListening = () => {
        setTranscript('')
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return alert("Speech Recognition not supported in this browser");
        console.log('started listening')

        var recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            setTranscript((prev) => {
                const updated = prev + " " + text;
                console.log("📝 New transcript:", updated);
                return updated;
            });
        };

        recognition.onerror = (event) => {
            console.error("Error:", event.error);
        };

        recognitionRef.current = recognition;
        recognition.onend = () => {
            
            console.log(transcript)
            if (listeningref.current) {
                recognition.start();
            }
            else
            {

                recognition.stop();
            }
        }
        recognition.start();
        listeningref.current = true;

    };

    useEffect(() => {
        if (listeningref.current && transcript) {
            datafromvoice(transcript)
        }
    }, [transcript])


    return (
        <div className="h-full w-20 flex justify-evenly flex-wrap items-center ">
            {!listeningref.current && <button className="w-8 h-8  " onClick={()=>{
                startListening();
                }}>🎤</button>}
            {listeningref.current && <button className="w-8 h-5 pl-2" onClick={() =>{ 
                listeningref.current=false
             recognitionRef.current.stop()}}><FaCheck /></button>  
            }
             {listeningref.current && <button className="w-8 h-5 pb-7" onClick={() =>{ 
             
                datafromvoice('delete')
                setTranscript(null)
                 listeningref.current =false 
               recognitionRef.current.stop() }}>X</button>  
            }
        </div>
    );
};





export default Whisper;