import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Users from './pages/Users/Users';
import Products from './pages/Products/Products';
import Bookings from './pages/Bookings/Bookings';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
const AppRoutes = () => {
  const user= localStorage.getItem("user");
  console.log(user);
  
  return (
    <Routes>
      {user? (
        <>
         <Route path="/users" element={<Users/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/bookings" element={<Bookings/>}/>
        <Route path="/" element={<Navigate to="/products" />} /></>
      ):(
        <>
        <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </>
      )}
       

    </Routes>
  )
}

export default AppRoutes