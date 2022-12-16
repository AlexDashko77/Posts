import React from 'react';
import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from '../context';
import About from '../pages/About';
import PostIdPage from '../pages/PostIdPage';
import Posts from '../pages/Posts';
import { publicRoutes, privateRoutes } from '../router'
import Loader from './UI/loader/Loader';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);   

    if(isLoading) {
        return <Loader/>
    }

    return (
        isAuth
            ? <Routes>
                {privateRoutes.map((el => (
                    <Route key={el.path} element={el.Element} path={el.path} />
                )))}
                <Route path='*' element={<Navigate to={'/posts'} />} />
            </Routes>
            :
            <Routes>
                {publicRoutes.map((el => (
                    <Route key={el.path} element={el.Element} path={el.path} />
                )))}
                <Route path='*' element={<Navigate to={'/login'} />} />
            </Routes>
    )
}
export default AppRouter;