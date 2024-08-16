import React, { useState, FormEvent } from "react";
import "../styles/register.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../apis/auth";
interface RegisterState {
    fullname: string;
    email: string;
    role: "admin" | "user";
    password: string;
  }
const Register: React.FC = () => {
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterState>({
    fullname: "",
    email: "",
    role: "user",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleRegister =async (e: FormEvent) => {
    e.preventDefault();
    try {
        const data = await registerUser(state.fullname, state.email, state.role, state.password);
        console.log(data.message);
        navigate("/login")
    } catch (error) {
        console.error("There was an error registering the user!", error)
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fullname">Fullname</label>
            <input
              id="fullname"
              type="text"
              value={state.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={state.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={state.role}
              onChange={handleChange}
              required
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={state.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit">Register</button>
      </form>
      <p>
        <a href="/login">Back to Login</a>
      </p>
    </div>
  );
};

export default Register;
