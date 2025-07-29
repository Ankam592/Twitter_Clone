import React from "react";

const InputText = ({
    type = 'text',
    className = '',
    placeholder,

    ...Props

})=>
{
    
   return (
    <input type={type} className={className} placeholder={placeholder} {...Props} />
       
   )
}


export default InputText;