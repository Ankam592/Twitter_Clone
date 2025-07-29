import React, { useState } from "react";
import { InputText } from "./Index";
import { useNavigate } from "react-router-dom";

const SearchBox = ({ type, className, Placeholder='Search Users', ...Props }) => {
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        {
            if(e.target.value)
            {
            navigate(`/getUsers/${encodeURIComponent(input)}`);
            }
            else
            {
                navigate('/')
            }
        }
    };

    return (
        <InputText
            type={type}
            className={className}
            placeholder={Placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={handleKeyDown}
        />
    );
};

export default SearchBox;
