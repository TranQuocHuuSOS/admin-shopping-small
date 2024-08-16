import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes";
function App() {
  return (
    <Router>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ padding: '1rem', flex: 1 }}>
          <AppRoutes />
        </main>
      </div>
    </div>
  </Router>
  );
}

export default App;
