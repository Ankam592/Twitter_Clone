import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, authentication }) => {
    const nav = useNavigate();
    const [loader, setLoader] = useState(true);
    const isAuth = useSelector((state) => {
        return state.auth.isAuthenticated
    })
    useEffect(() => {
        if (authentication && !isAuth) {
            nav('/loginPage')
        }
        setLoader(false)
    }, [authentication, isAuth])
        console.log(loader)
    if (loader) {
        return <h1>Still Loading!!!!!!</h1>
    }
    else {
        return children
    }

}

export default AuthLayout;