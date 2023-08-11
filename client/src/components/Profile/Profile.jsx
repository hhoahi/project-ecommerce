import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { FaUserAlt } from "react-icons/fa";
import "./Profile.scss";
import { getUser } from "../../utils/helpers";
import { Context } from "../../utils/context";

const Profile = () => {
  const navigate = useNavigate();

  const userProfile = getUser();
  console.log(userProfile);

  const { setIsOpen } = useContext(Context);

  const handleClick = () => {
    setIsOpen(false);
    navigate("/myprofile");
  };

  return (
    <div className="profile">
      <div className="profile_account">
        <div className="profile_account_info">
          <p>{userProfile?.username || "Guest"}</p>
        </div>
      </div>

      <div className="profile_menu">
        <div className="profile_menu_one">
          <div className="profile_menu_one_item" onClick={() => handleClick()}>
            <FaUserAlt />
            <span>Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
