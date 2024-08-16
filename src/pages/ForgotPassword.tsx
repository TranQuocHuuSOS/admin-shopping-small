import React, { FormEvent, useState } from 'react';
import '../styles/forgotpassword.css';  
import { forgotPassword } from '../apis/auth';
import { useNavigate } from 'react-router-dom';
const ForgotPassword:React.FC = () => {
    const navigate= useNavigate();
  const [email, setEmail] = useState<string>('');

  const handleForgotPassword =async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const data = await forgotPassword(email);
        console.log(data);
        navigate("/login");
    } catch (error) {
        console.error("There was an error forgot password the user!", error);
    }
  
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <p>
        <a href="/login">Back to Login</a>
      </p>
    </div>
  );
};

export default ForgotPassword;
