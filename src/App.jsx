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
  const current_user =  () => {
    const user = fetch("https://twitterclone-node1.onrender.com/WeatherApp/currentuser",
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
        <SideNav></SideNav>
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
    
      <div className="flex flex-wrap h-screen">
        <SideNav></SideNav>
        <div className='flex h-140 flex-1 bg-[#F0F8FF]'>
          <div className='flex justify-center items-start w-190 h-full '>
            <ToastContainer position='top-right' autoClose={3000}/>
            <Outlet />
          </div>
          <div className='w-full h-full flex-1 ml-5'>
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
