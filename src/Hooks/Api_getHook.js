import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Api_getHook = ({email}) => {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
        const data = fetch(`${API_URL}/WeatherApp/follow/${email}`,
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