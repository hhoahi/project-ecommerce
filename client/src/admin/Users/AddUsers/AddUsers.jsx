import React, { useState } from "react";
import "./AddUsers.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const initialUser = { email: "", password: "", username: "" };
export const AddUsers = () => {
  const [user, setUser] = useState(initialUser);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const signUp = async (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của việc gửi form

    try {
      const url = `http://localhost:1337/api/auth/local/register`;
      if (user.username && user.email && user.password) {
        const res = await axios.post(url, {
          username: user.username,
          email: user.email,
          password: user.password,
        });
        if (!!res) {
          setUser(initialUser);
        }
      }
      setShowSuccessMessage(true);
      const timeout = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    } catch (error) {}
  };

  const handleUserChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  return (
    <div className="main-add-user">
      <form className="container-add-user" onSubmit={signUp}>
        <h3>Add User</h3>
        {showSuccessMessage && (
          <div className="success-message">
            Successfully Updated.
            <IoCheckmarkDoneSharp />
          </div>
        )}
        <div className="card-user-body">
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
          <label htmlFor="email">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleUserChange}
            placeholder="Enter password"
          />
          <button type="submit" color="primary">
            Save Add
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddUsers;
