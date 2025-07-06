import React from "react";

const Button = ({
    className,
    value='',
    ...props

})=>
{

    return(
        <button   value={value} className={className} {...props} >
           
        </button>
    )

}

export default Button