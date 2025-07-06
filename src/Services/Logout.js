
import { useDispatch } from "react-redux"
import { logout } from "../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const Logout = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    console.log("Hello Manoj")

    useEffect(() => {
        const logoutuser = fetch('http://localhost:3000/WeatherApp/logoutUser',{
            method:'GET',
            credentials : 'include'
        })
        console.log(logoutuser)
         dispatch(logout());
         nav('/loginPage');
    }, [dispatch, nav])

}