import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Api_getHook = ({email}) => {

    try {
        const data = fetch(`https://localhost:3000/WeatherApp/follow/${email}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json'
                },
                credentials: 'include'
            }
        );
        data.then((res) => {
            if (res.status >= 200 && res.status < 400) {
                res.then((final_data) => {
                    console.log(final_data)
                    return final_data
                })
            }
            else {
                console.log('some thing went wrong!')
                return 'something went wrong'

            }
        })
            .catch((err) => {
                console.log(err)
            })
    }
    catch (err) {
        console.log(err)
    }
}


export default Api_getHook;