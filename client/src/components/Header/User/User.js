import React, { useState } from "react";
import "./User.scss";

const User = ({ setShowUserPage }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="user-page">
      <div className="user-content">
        <div className="close-button" onClick={() => setShowUserPage(false)}>
          X
        </div>

        {showLogin && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button>Login</button>
          </>
        )}

        {showRegister && <button>Register</button>}
        {!showLogin && !showRegister && (
          <>
            <button onClick={handleLoginClick}>Login</button>
            <button onClick={handleRegisterClick}>Register</button>
          </>
        )}
      </div>
    </div>
  );
};

export default User;
