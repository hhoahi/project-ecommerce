import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { storeUser } from "../../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/store/blog_banner_1_grande.webp";

import "./Login.scss";

const initialUser = { password: "", identifier: "" };

export const Login = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const url = `http://localhost:1337/api/auth/local`;
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);
        if (data.jwt) {
          storeUser(data);
          toast.success("Logged in successfully!", {
            hideProgressBar: true,
          });
          setUser(initialUser);
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="app">
      <div className="auth-form-container">
        <div className="logo-container">
          <img
            src={logo}
            alt="Logo"
          />
        </div>
        <h2>Login</h2>
        <form className="login-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="identifier"
            value={user.identifier}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </form>
        <button color="primary" onClick={handleLogin}>
          Login
        </button>
        <h6 className="link-btn">
          <Link to="/register">Click here to Sign Up</Link>
        </h6>
      </div>
    </div>
  );
};
