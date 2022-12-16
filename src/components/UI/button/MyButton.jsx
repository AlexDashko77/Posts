import React from 'react';
import cn from "./MyButton.module.css"

const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className={cn.myBtn}>
            {children}
        </button>
    )
};

export default MyButton;