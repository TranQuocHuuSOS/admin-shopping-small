import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Admin/Sidebar";
import AppRoutes from "./routes";
function App() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column",  height: "100vh" }}>
        <Header />
        {user && user.role === "admin" ? (
          <div style={{ display: "flex", flex: 1,  }}>
            <Sidebar />
            <main style={{marginLeft:"12%", padding: "1rem", flex: 1 }}>
              <AppRoutes />
            </main>
          </div>
        ) : (
          <main style={{  flex: 1 }}>
            <AppRoutes />
          </main>
        )}
      </div>
    </Router>
  );
}

export default App;
