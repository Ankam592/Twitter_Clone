import { useEffect, useState } from 'react'
import { Outlet,useNavigate } from 'react-router-dom';
import './App.css'
import { login, logout } from './store/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SideNav, Footer, RightSideNav } from './Components/Index'
import { ToastContainer } from 'react-toastify';


function App() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [email,setEmail] = useState(null);
  const [loading,setLoading] = useState(false); 
  const API_URL = import.meta.env.VITE_API_URL;
  const current_user =  () => {
    const user = fetch(`${API_URL}/WeatherApp/currentuser`,
      {
        method: 'GET',
        credentials: 'include'
      })
    user.then((result) => {
     return  result.json()})
     .then((res) => {
      console.log(res)
      setLoading(true)
        if (res.userdata.isAuthenticated) {
          setEmail(res.userdata.user.email)
          dispatch(login(
            { 
              email: res.userdata.user.email,
            }))
        }
        else {
          console.log('logged out')
          dispatch(logout())
          nav('/loginPage');
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
  useEffect(() => {
       current_user();
    }, [])

  return !loading ?  (
    
      <div className="flex">
        <div className="hidden md:flex md:w-16 lg:w-64">
        <SideNav></SideNav>
        </div>
        <div className='flex h-100 '>
          <div className='flex justify-center flex-wrap items-start w-170 h-full border-r border-blue-100 '>
            <h1>Loading</h1>
          </div>
          <div className='w-60 h-full flex-1 ml-5'>
            <RightSideNav></RightSideNav>
          </div>

          {/* <div className='fixed bottom-0 left-56 w-full h-15 '>
          <Footer></Footer>
        </div> */}
        </div>
      </div>
    ) :
    (
    
      <div className="flex  h-screen">
        <div className="w-16 sm:w-16 md:w-64">
         
        <SideNav></SideNav>
        </div>
        <div className='flex-1 flex justify-evenly h-full  bg-[#F0F8FF] flex-wrap '>
          <div className='flex justify-center items-center w-60 sm:flex sm:w-6/12 md:w-3/5 lg:w-3/4  max-w-[750px]  mx-auto h-full '>
            <ToastContainer position='top-right' autoClose={3000}/>
            <Outlet />
          </div>
          <div className='w-40 sm:flex sm:w-[200px]'>
            <RightSideNav></RightSideNav>
          </div>

          {/* <div className='fixed bottom-0 left-55 w-full  h-14 bg-[#1DA1F2] rounded-sm'>
          <Footer></Footer>
        </div> */}
        </div>

      </div>
    )

  }

  export default App
