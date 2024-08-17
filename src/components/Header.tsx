import React, { useState, useEffect } from "react";
import "../styles/header.css";
import { logoutUser } from "../apis/auth";
import { useNavigate } from "react-router-dom";
interface User {
  fullname: string;
  email: string;
  role:string;
}
const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const handleUserSectionClick = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleLogout = async () => {
    if (user && user.email) {
      try {
        const result = await logoutUser(user.email);
        if (result) {
          console.log("User logged out");
          localStorage.removeItem("user");
          setUser(null);
          navigate("/login");
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <header>
      {!user ?(
        <div className="headers">
        <div className="title-section">
          <div className="user-sections">
            <p className="user-email">Hotline:</p>
            <p className="user-emails">1900 6750</p>
          </div>
          <div className="user-sections">
            <p className="user-email">Support:</p>
            <p className="user-emails">tcong9137@gmail.com</p>
          </div>
        </div>
        <div className="user-section" onClick={handleUserSectionClick}>
          <div className="user-info">
            <a href="/login" className="user-email">Sign In</a>
          </div>
          <div className="user-info">
            <a href="/register" className="user-email">Sign Up</a>
          </div>
          <div className="user-info">
            <a className="user-email">Contact</a>
          </div>
        </div>
      </div>
      ):(
        <></>
      )}
      
      <div className="header">
        <div className="title-section">
          <img src="/images/logos.png" alt="Logo" className="icon" />
          <h1 className="title">Ong Tran's Store</h1>
        </div>
        {user && user.role === "user" ? (
          <>
            <div className="nav-links">
              <a href="/" className="nav-link">
                Home
              </a>
              <a href="/about" className="nav-link">
                About Us
              </a>
              <a href="/booking" className="nav-link">
                Booking
              </a>
            </div>
          </>
        ) : (
          <></>
        )}

        {user ? (
          <>
            <div className="user-section" onClick={handleUserSectionClick}>
              <img
                src="/images/user.png"
                alt="User Avatar"
                className="avatar"
              />
              <div className="user-info">
                <p className="user-name">{user.fullname}</p>
                <p className="user-email">{user.email}</p>
              </div>
              <img
                src="/images/bottom.png"
                alt="Logout Icon"
                className="bottom-icon"
              />
              {dropdownOpen && (
                <div className="dropdown">
                  <div className="dropdown-item" onClick={handleLogout}>
                    <img
                      src="/images/logout.png"
                      alt="Logout Icon"
                      className="dropdown-icon"
                    />
                    <p>Logout</p>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="user-section" onClick={handleUserSectionClick}>
              <img
                src="/images/user.png"
                alt="User Avatar"
                className="avatar"
              />
              <div className="user-info">
                <p className="user-name">John Doe</p>
                <p className="user-email">johndoe@example.com</p>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
