import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { loginUser } from "../apis/auth";
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      console.log("sau login ", data);
      
      localStorage.setItem("user", JSON.stringify(data.data));
      if (data.data.role === "admin") {
        navigate("/products");
      } else {
        navigate("/home");
      }
      window.location.reload();
    } catch(error){
      console.error("There was an error loging the user!", error);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-box">
      <h2 className="title">Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        <a href="/forgotpassword">Forgot password?</a>
      </p>
      <p>
        <a href="/register">Create new account?</a>
      </p>
      </div>
    </div>
  );
};

export default Login;
