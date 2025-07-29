import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import  reducer from './AuthSlice';

const store = configureStore(
    {
        reducer :
        {
            auth : reducer,
        }
    }
)

export default store;//a configured store it will return/export