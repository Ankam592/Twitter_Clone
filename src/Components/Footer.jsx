import React from "react";

const Footer = () => {
  return (
    <div className="w-full h-15 bg-white-800 flex justify-center items-start flex-wrap rounded-lg">
      <div className="w-full h-1/3 bg-white-800 flex justify-evenly ">
        <div className="w-1/4 h-full bg-white-800">
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
        <div className="w-1/4 h-full bg-white-800">
               <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
        <div className="w-1/4 h-full bg-white-800">
          <a href="#" className="hover:underline">Cookie Policy</a>
        </div>
         <div className="w-1/4 h-full bg-white-800">
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
      <div className="w-full h-1/3 bg-white-800 flex justify-evenly ">
        <div className="w-1/4 h-full bg-white-800">
         <a href="#" className="hover:underline">About</a>
        </div>
        <div className="w-1/4 h-full bg-white-800">
         <a href="#" className="hover:underline">Careers</a>
        </div>
        <div className="w-1/4 h-full bg-white-800">
         <a href="#" className="hover:underline">Help Center</a>
        </div>
      </div>
      <div className="w-full h-1/3 bg-white-800 flex justify-evenly ">
       <p className="text-center">© 2025 Twitter Clone</p>
      </div>
    </div>
  )
}

export default Footer;