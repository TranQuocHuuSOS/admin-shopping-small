import React, { useState, useEffect } from "react";
import "../styles/header.css";
import { logoutUser } from "../apis/auth";
import { useNavigate } from 'react-router-dom';
interface User {
  fullname: string;
  email: string;
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
          navigate('/login');
        }
        else {
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
    <header className="header">
      <div className="title-section">
        <img src="/images/logos.png" alt="Logo" className="icon" />
        <h1 className="title">Ong Tran's Store</h1>
      </div>
      {user ? (
        <>
          <div className="user-section" onClick={handleUserSectionClick}>
            <img src="/images/user.png" alt="User Avatar" className="avatar" />
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
            <img src="/images/user.png" alt="User Avatar" className="avatar" />
            <div className="user-info">
              <p className="user-name">John Doe</p>
              <p className="user-email">johndoe@example.com</p>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
