
import { useDispatch } from "react-redux"
import { logout } from "../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
export const Logout = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    console.log("Hello Manoj")
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        (  async ()=>{
        const logoutuser = await fetch(`${API_URL}/WeatherApp/logoutUser`, {
            method: 'GET',
            credentials: 'include'
        })
        console.log(logoutuser)
        const log = await logoutuser.json();
            if (logoutuser.status == 200) {
                toast.success("LoggedOut!", {
                                icon: "🚀",
                                className: "custom-toast-success",
                                style: {
                                    backgroundColor: "#1DA1F2",
                                    color: "#FFFFFF",
                                    fontWeight: "bold",
                                    height:'20px',
                                },
                            });
                dispatch(logout());

                nav('/loginPage');
            }
        })();


    }, [dispatch, nav])

}