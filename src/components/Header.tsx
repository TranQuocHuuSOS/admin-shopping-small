import  { useState, useEffect } from "react";
import "../styles/header.css";
import { logoutUser } from "../apis/auth";
import { useNavigate, Link, useLocation } from "react-router-dom";
interface User {
  fullname: string;
  email: string;
  role: string;
}
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [activeLink, setActiveLink] = useState("/");
  const handleUserSectionClick = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleLogout = async () => {
    if (user && user.email) {
      try {
        const result = await logoutUser(user.email);
        if (result) {
          localStorage.removeItem("user");
          setUser(null);
          navigate("/login");
        } else {
          console.error("Logout failed");
        }
        window.location.reload();
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
    setActiveLink(location.pathname);
  }, [location.pathname]);
  return (
    <header>
      {!user ? (
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
              <a href="/login" className="user-email">
                Sign In
              </a>
            </div>
            <div className="user-info">
              <a href="/register" className="user-email">
                Sign Up
              </a>
            </div>
            <div className="user-info">
              <a className="user-email">Contact</a>
            </div>
          </div>
        </div>
      ) : (
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
              <Link
                to="/home"
                className={`nav-link ${activeLink === "/home" ? "active" : ""}`}
                onClick={() => setActiveLink("/home")}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`nav-link ${
                  activeLink === "/about" ? "active" : ""
                }`}
                onClick={() => setActiveLink("/about")}
              >
                About Us
              </Link>
              <Link
                to="/booking"
                className={`nav-link ${
                  activeLink === "/booking" ? "active" : ""
                }`}
                onClick={() => setActiveLink("/booking")}
              >
                Booking
              </Link>
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
