import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Logo, Button } from './Index';
import { LogOut } from 'lucide-react';
import { HomeIcon, UserIcon } from "@heroicons/react/16/solid";
import { GlobeAltIcon, BellIcon, BookmarkIcon, ArrowRightEndOnRectangleIcon, UserPlusIcon } from '@heroicons/react/24/outline';


const SideNav = () => {

    const nav = useNavigate();
    const loc = useLocation();
    const authenticated = useSelector((state) => { return state.auth.isAuthenticated })
    const nav_links =
        [
            {
                name: 'Home',
                route: '/',
                Icon: HomeIcon,
                IsAuthenticated: true
            },
            {
                name: 'Explore',
                route: '/explore',
                Icon: GlobeAltIcon,
                IsAuthenticated: !authenticated
            },
            {
                name: 'Dashboard',
                route: '/dashboard',
                Icon: BellIcon,
                IsAuthenticated: authenticated
            },
            {
                name: 'Bookmarks',
                route: '/bookmarks',
                Icon: BookmarkIcon,
                IsAuthenticated: authenticated
            },
            {
                name: 'Profile',
                route: '/profile/:ID',
                Icon: UserIcon,
                IsAuthenticated: authenticated
            },
            {
                name: 'Login',
                route: '/loginPage',
                Icon: ArrowRightEndOnRectangleIcon,
                IsAuthenticated: !authenticated
            },
            {
                name: 'Signup',
                route: '/signupPage',
                Icon: UserPlusIcon,
                IsAuthenticated: !authenticated
            },
            {
                name: 'Logout',
                route: '/logout',
                Icon: LogOut,
                IsAuthenticated: authenticated
            },

        ]
    return (
        <div className="pt-2 bg-[#F0F8FF] flex-col h-full w-50  flex justify-start items-start   ">
            <div className=" w-50 h-10 flex justify-center "> <Logo></Logo></div>
            <div className="mt-4 w-50 h-90 flex flex-col justify-start items-center flex-wrap">
                {nav_links.map((nav_ele,idx) => {
                    const IconComponent = nav_ele.Icon;
                    return nav_ele.IsAuthenticated ? (
                        <div key={idx} className={`${loc.pathname == nav_ele.route && "text-[#1DA1F2] border-l border-4px border-[#1DA1F2] rounded-lg border-[#1DA1F2] bg-[#D0E8FF]  "} pl-2 pr-2  w-37 h-10 flex justify-center hover:bg-[#C0DFFE] rounded-lg items-center`}>
                            {IconComponent && <IconComponent onClick={() => nav(nav_ele.route)} className="w-6 h-10 text-[#1DA1F2]" />}
                            <Button 
                                onClick={() => nav(nav_ele.route)}
                                className={`flex justify-start items-center ml-2 w-25 h-10 bg-white-800   rounded text-[#1DA1F2]`}>{nav_ele.name}</Button>
                        </div>
                    ) : null

                })}
                <Button className='mt-3 w-37 h-10 bg-[#1DA1F2] text-[#FFFFFF] rounded-lg' onClick={() => nav('/tweetPage')}>Tweet</Button>
                <Button className='mt-3 w-37 h-10 bg-[#1DA1F2] text-[#FFFFFF] rounded-lg' onClick={() => nav('/stopwatch')}>Stop Watch</Button>
                <Button className='mt-3 w-37 h-10 bg-[#1DA1F2] text-[#FFFFFF] rounded-lg' onClick={() => nav('/signUpWizard')}>SignUp Wizard</Button>

            </div>
        </div>

    )
}

export default SideNav;
