import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";

export const EditUser = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const url = `http://localhost:1337/api/users/${id}`;
      const res = await axios.get(url);
      setUser(res.data);
    } catch (error) {
      // Xử lý lỗi
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault()
    try {
      const url = `http://localhost:1337/api/users/${id}`;
      const response = await axios.put(url, user);
      if (response) {
        setUser(null)
        navigate("/users");
      }
      // Cập nhật thành công, chuyển đến trang "users"
    } catch (error) {
      // Xử lý lỗi
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
    <div className="grid-container">
      <Sidebar />
      <div className="main-user">
        <form className="container-user" onSubmit={updateUser}>
          <h3>Edit User</h3>
          <div className="card-body">
            <label htmlFor="username">Full Name</label>
            <input
              type="text"
              name="username"
              value={user.username || ""}
              onChange={handleUserChange}
              placeholder="Enter full name"
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleUserChange}
              placeholder="Enter email"
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={user.password || ""}
              onChange={handleUserChange}
              placeholder="Enter password"
            />

            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
