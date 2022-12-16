import { useContext } from 'react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context"

const NavBar = () => {
    const {setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
    }

    return (
        <div className='navbar'>
            <MyButton onClick={logout}>Выход</MyButton>
            <div className="navbar-items">
                <MyButton><NavLink className='btn' to="/about">О сайте</NavLink></MyButton>
                <MyButton><NavLink className='btn' to="/posts">Посты</NavLink></MyButton>
            </div>
        </div>
    )
}

export default NavBar;