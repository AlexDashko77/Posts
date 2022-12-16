import React from 'react';
import cn from "./MyInput.module.css"

const MyInput = (props) => {
    return (
        <input className={cn.myInput} {...props}/>
    )
}

export default MyInput;