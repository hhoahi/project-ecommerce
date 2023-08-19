import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import AddUsers from "./AddUsers/AddUsers";
import { AiOutlineUserAdd, AiFillEdit } from "react-icons/ai";
import { BiSolidTrash } from "react-icons/bi";
import "./Users.scss";
import { getUserProfile } from "../../utils/api";

const stripeAppDevUrl = process.env.REACT_APP_STRIPE_APP_DEV_URL;

function User() {
  const [userData, setUserData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserProfile.get("/api/users?populate=*");
        if (response && response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleToggleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleEditUser = (userId) => {
    navigate(`/api/users/${userId}`);
  };

  const handleDeleteSelectedUsers = async () => {
    try {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete ${selectedUsers.length} selected users?`
      );
      if (!confirmDelete) {
        return;
      }

      // Lặp qua danh sách người dùng đã chọn và gửi yêu cầu xóa đến API Strapi
      for (const userId of selectedUsers) {
        await getUserProfile.delete(`/api/users/${userId}`);
      }

      // Cập nhật lại danh sách người dùng hiển thị sau khi xóa thành công
      const updatedUserData = userData.filter(
        (user) => !selectedUsers.includes(user.id)
      );
      setUserData(updatedUserData);
      setSelectedUsers([]); // Xóa các người dùng đã chọn
    } catch (error) {
      console.error("Error deleting users", error);
    }
  };

  console.log(userData);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="grid-container">
      <Sidebar />
      <div className="main-container">
        <div className="user-body">
          <div className="title-main">
            <h3>User Profile</h3>
          </div>

          <div className="btn-actions">
            <span className="user-actions">
              <BiSolidTrash
                className="admin-icon"
                onClick={handleDeleteSelectedUsers}
              />
              <AiOutlineUserAdd
                className="admin-icon"
                onClick={() => setShowAdd(true)}
              />
            </span>
          </div>

          <div className="user-grid">
            {userData.map((user) => (
              <div key={user.id} className="user-card">
                <label className="user-checkbox">
                  <AiFillEdit
                    className="edit-button"
                    onClick={() => handleEditUser(user.id)}
                  />
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleToggleUserSelection(user.id)}
                  />
                </label>
                <img
                  src={
                    user.img
                      ? stripeAppDevUrl + user.img.url
                      : "placeholder_image_url"
                  }
                  alt={""}
                  className="user-avatar"
                />
                <div className="info-user">
                  <p className="username">Username: {user.username}</p>
                  <p className="email">Email: {user.email}</p>
                  <p className="date">
                    Create Date: {formatDate(user.createdAt)}
                  </p>
                  <p className="role">Role: {user.role.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showAdd && <AddUsers setShowAdd={setShowAdd} />}
    </div>
  );
}

export default User;
