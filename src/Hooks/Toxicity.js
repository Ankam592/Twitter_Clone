import React from "react";

const Toxicity = async (text)=>
{
   try
   {
    const API_KEY = 'AIzaSyBgTca0mDfoWk3flfSyjqlCWTfJhy4153U';
    console.log(text)
     const req_body =
     {
        comment : {text},
        languages : ['en'],
        requestedAttributes : {
            TOXICITY :{},
            INSULT : {},
            THREAT : {},
            IDENTITY_ATTACK :{},
            PROFANITY : {}
        },
        doNotStore : true
     }
     const data = await fetch(`https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${API_KEY}`,{
        method: 'POST',
        headers :
        {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(req_body)
     })
     const scores = await data.json()
     console.log(scores)
     if (!scores.attributeScores && text.length>0) {
      alert("Could not analyze your tweet. Try again.");
      return;
    }

    const toxicityScore = scores.attributeScores.TOXICITY?.summaryScore.value || 0;
    const insultScore = scores.attributeScores.INSULT?.summaryScore.value || 0;

    if (toxicityScore > 0.8 || insultScore > 0.7) {
      alert("⚠️ Your tweet seems toxic. Please revise it.");
    }
    return toxicityScore;
     
   }
   catch(error)
   {
    console.log(error)
   }
}


export default Toxicity;