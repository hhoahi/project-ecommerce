import React from "react";
import { useNavigate } from "react-router-dom";

import { FaUserAlt } from "react-icons/fa";
import "./Profile.scss";
import { getUser } from "../../../utils/helpers";

const Profile = () => {
  const navigate = useNavigate();

  const userProfile = getUser();
  console.log(userProfile);

  return (
    <div className="profile">
      <div className="profile_account">
        <div className="profile_account_info">
          <p>{userProfile.username}</p>
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
