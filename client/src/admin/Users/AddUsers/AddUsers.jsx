import { useState } from "react";
import "./AddUsers.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialUser = { email: "", password: "", username: "" };
export const AddUsers = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const signUp = async () => {
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
          navigate("/users");
        }
      }
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
    <div className="main-user">
      <form className="container-user" onSubmit={signUp}>
        <h3>Add User</h3>
        <div className="card-body">
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
          <button color="primary" onClick={signUp}>
            Save Add
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddUsers;
