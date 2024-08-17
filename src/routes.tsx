import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Users from "./pages/Admin/Users/Users";
import Products from "./pages/Admin/Products/Products";
import Bookings from "./pages/Admin/Bookings/Bookings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/User/Home/Home";
import AboutUs from "./pages/User/AboutUs/AboutUs";
import Booking from "./pages/User/Booking/Booking";
const AppRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user") || '{}');
  console.log(user);

  return (
    <Routes>
      {user && user.role ? (
        <>
          {user.role === "admin" ? (
            <>
              <Route path="/users" element={<Users />} />
              <Route path="/products" element={<Products />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/" element={<Navigate to="/products" />} />
            </>
          ) : (
            <>
              <Route path="/home" element={<Home/>} />
              <Route path="/about" element={<AboutUs/>} />
              <Route path="/booking" element={<Booking/>} />
              <Route path="/" element={<Navigate to="/home" />} />
            </>
          )}
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
