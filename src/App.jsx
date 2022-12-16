import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/UI/navbar/NavBar';
import AppRouter from './components/AppRouter';
import {AuthContext} from "./context";
import { useState } from "react";
import { useEffect } from 'react';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if(localStorage.getItem('auth')) {
      setIsAuth(true);
    }
    setLoading(false);
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
      </AuthContext.Provider>
  )
}


export default App;
