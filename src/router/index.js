import About from "../pages/About"
import Posts from "../pages/Posts"
import PostIdPage from "../pages/PostIdPage"
import React from 'react';
import Login from "../pages/Login";

export const privateRoutes = [
    {path: '/about', Element: <About/>},
    {path: '/posts', Element: <Posts/>},
    {path: '/posts/:id', Element: <PostIdPage/>},
]

export const publicRoutes = [
    {path: '/login', Element: <Login/>},

]