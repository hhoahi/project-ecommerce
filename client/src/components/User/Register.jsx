import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/store/blog_banner_2_grande.webp";
import "./Register.scss";

const initialUser = { email: "", password: "", username: "" };
export const Register = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const signUp = async () => {
    try {
      const url = `http://localhost:1337/api/auth/local/register`;
      if (user.username && user.email && user.password) {
        const res = await axios.post(url, user);
        if (!!res) {
          toast.success("Registered successfully!", {
            hideProgressBar: true,
          });
          setUser(initialUser);
          navigate("/login");
        }
      }
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };

  const handleUserChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  return (
    <div className="app">
      <div className="auth-form-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <h2>Sign up</h2>
        <form className="register-form">
          <label htmlFor="email">Full name</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleUserChange}
            placeholder="Enter your full name"
          />

          <label htmlFor="password">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleUserChange}
            placeholder="Enter your email"
          />
          <label htmlFor="email">Passsword</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleUserChange}
            placeholder="Enter password"
          />
        </form>
        <button color="primary" onClick={signUp}>
          Sign up
        </button>
        <h6 className="link-btn">
          <Link to="/login">Click here to Sign in</Link>
        </h6>
      </div>
    </div>
  );
};
