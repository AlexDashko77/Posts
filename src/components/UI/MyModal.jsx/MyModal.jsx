import cn from "./MyModal.module.css"
import React from 'react';

const MyModal = ({children, visible, setVisible}) => {

    const rootClasses = [cn.myModal];
    if(visible) {
        rootClasses.push(cn.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cn.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default MyModal;