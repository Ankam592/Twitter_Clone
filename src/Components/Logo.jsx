import React from "react";


const Logo = ({width = "w-15",
              height = "h-15"
 })=>
{
    return (
        <img className={`${width} ${height}`} src="/xx.png" alt="Logo" />
    )
}

export default Logo;