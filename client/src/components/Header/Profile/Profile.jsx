import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FaUserAlt } from "react-icons/fa";
import "./Profile.scss";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/users");
        if (response.data && response.data.length > 0) {
          setUserData(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile">
      <div className="profile_account">
        <div className="profile_account_info">
          <p>{userData.username}</p>
        </div>
      </div>

      <div className="profile_menu">
        <div className="profile_menu_one">
          <div
            className="profile_menu_one_item"
            onClick={() => navigate("/myprofile/")}
          >
            <FaUserAlt />
            <span>My Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
