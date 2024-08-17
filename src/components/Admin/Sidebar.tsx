import React from 'react'
import {  Link ,useLocation} from "react-router-dom";
import "../../styles/sidebar.css"
const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="sidebar">
    <nav>
    <h2 className="sidebar-title">Management</h2>
        <ul>
          <li className={location.pathname === "/products" ? "active" : ""}>
            <Link to="/products">Products</Link>
          </li>
          <li className={location.pathname === "/bookings" ? "active" : ""}>
            <Link to="/bookings">Bookings</Link>
          </li>
          <li className={location.pathname === "/users" ? "active" : ""}>
            <Link to="/users">Users</Link>
          </li>
        </ul>
    </nav>
  </aside>
  )
}

export default Sidebar
