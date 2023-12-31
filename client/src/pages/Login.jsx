import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { storeUser } from "../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/store/blog_banner_1_grande.webp";

import "../styles/Login.scss";
import { getCurrentUser, getProfile } from "../utils/api";
import { Context } from "../utils/context";

const initialUser = { password: "", identifier: "" };

export const Login = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();
  const { setIsLogin, setIsOpen } = useContext(Context);
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
        const userId = data.user?.id;
        localStorage.setItem("userInfo", "true");
        setIsLogin(true);
        setIsOpen(false);
        storeUser(data);
        if (data.jwt) {
          setUser(initialUser);
          const { data } = await getProfile.get(
            `/api/users/${userId}?populate=*`
          );

          if (data.role && data.role.type === "admin") {
            localStorage.setItem("isAdmin", true);
            navigate("/admin");
          } else {
            navigate("/");
          }
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
          <img src={logo} alt="Logo" />
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
export default Login;
