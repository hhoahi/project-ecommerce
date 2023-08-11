import React, { useContext, useEffect, useState } from "react";
import "./EditProfile.scss";
import { getUserProfile, getProfile, getOrderUser } from "../../../utils/api";
import { Context } from "../../../utils/context";

import { RiAccountCircleLine, RiSettings3Line } from "react-icons/ri";
import { BsBagHeart, BsEye } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

function EditProfile() {
  const [selectedStore, setSelectedStore] = useState("tab_0");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [productOrder, setProductOrder] = useState([]);

  const handleStoreClick = (storeId) => (event) => {
    event.preventDefault();
    setSelectedStore(storeId);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.user.id;
  console.log(userId);

  const { userData, setUserData } = useContext(Context);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Lấy thông tin người dùng hiện tại từ API của Strapi và cập nhật state
    const fetchUserData = async () => {
      try {
        const response = await getUserProfile.get(`/api/users/${userId}`); // Thay đổi URL tương ứng với API của Strapi
        setUserData({
          ...response.data,
          password: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await getUserProfile.put(`/api/users/${userId}`, {
        username: userData.username,
        email: userData.email,
      }); // Thay đổi URL tương ứng với API của Strapi
      console.log("Thông tin người dùng đã được cập nhật:", response.data);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false); // Tắt thông báo sau 2 giây
      }, 3000);

      // Thực hiện các hành động sau khi cập nhật thành công
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
      // Xử lý lỗi khi cập nhật không thành công
    }
  };

  const handleChangePass = async (e) => {
    e.preventDefault();

    if (
      userData.newPassword !== "" &&
      userData.newPassword !== userData.confirmPassword
    ) {
      setUserData({ ...userData });
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    }
    try {
      const response = await getProfile.put(`/api/users/${userId}`, {
        password: userData.newPassword,
      }); // Thay đổi URL tương ứng với API của Strapi
      console.log("Thông tin người dùng đã được cập nhật:", response.data);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false); // Tắt thông báo sau 5 giây
      }, 3000);

      // Thực hiện các hành động sau khi cập nhật thành công
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
      // Xử lý lỗi khi cập nhật không thành công
    }
  };

  //Xử lý order
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getOrderUser(
          `/api/orders?filters[userId]=${userId}`
        );
        console.log(response.data);
        setProductOrder(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchUserData();
  }, [userId]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  console.log(productOrder);

  return (
    <div className="profile-main-content">
      <div className="layout">
        <div className="profile-page">
          <div className="banner">
            <h2>MY PROFILE</h2>
          </div>
          <div className="content-container">
            <div className="left">
              <ul className="tabs-head">
                <li
                  className={selectedStore === "tab_0" ? "active" : ""}
                  onClick={handleStoreClick("tab_0")}
                >
                  <a href="#tab_0">
                    <RiAccountCircleLine />
                    Account
                  </a>
                </li>
                <li
                  className={selectedStore === "tab_1" ? "active" : ""}
                  onClick={handleStoreClick("tab_1")}
                >
                  <a href="#tab_1">
                    <RiSettings3Line />
                    Settings
                  </a>
                </li>
                <li
                  className={selectedStore === "tab_2" ? "active" : ""}
                  onClick={handleStoreClick("tab_2")}
                >
                  <a href="#tab_2">
                    <BsBagHeart />
                    My Orders
                  </a>
                </li>
                <li
                  className={selectedStore === "tab_3" ? "active" : ""}
                  onClick={handleStoreClick("tab_3")}
                >
                  <a href="#tab_3">
                    <SlLocationPin />
                    Address
                  </a>
                </li>
                <li
                  className={selectedStore === "tab_4" ? "active" : ""}
                  onClick={handleStoreClick("tab_4")}
                >
                  <a href="#tab_4">
                    <BsEye />
                    Change Password
                  </a>
                </li>
              </ul>
            </div>
            <div className="right">
              <div className="tab-content">
                <div
                  id="tab_0"
                  style={{
                    display: selectedStore === "tab_0" ? "block" : "none",
                  }}
                >
                  <h3>Account Information</h3>
                  <div>
                    <h6>Full Name:</h6>
                    <p>{userData.username}</p>
                    <h6>Email:</h6>
                    <p>{userData.email}</p>
                    <h6>Phone:</h6>
                    <p>077564337</p>
                  </div>
                </div>

                <div
                  id="tab_1"
                  style={{
                    display: selectedStore === "tab_1" ? "block" : "none",
                  }}
                >
                  <h3>Account Settings</h3>
                  {showSuccessMessage && (
                    <div className="success-message">
                      Successfully Updated.
                      <IoCheckmarkDoneSharp />
                    </div>
                  )}
                  <form className="profile-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                    />

                    <label htmlFor="phone">Phone *</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="Enter phone"
                    />

                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                    />
                    <button type="submit" color="primary">
                      Save Change
                    </button>
                  </form>
                </div>

                <div
                  id="tab_2"
                  style={{
                    display: selectedStore === "tab_2" ? "block" : "none",
                  }}
                >
                  <h3>My Orders</h3>
                  <div className="order-content">
                    <div className="order-content-title">
                      <table>
                        <thead>
                          <tr>
                            <th>Img</th>
                            <th className="td-title">Name</th>
                            <th>Price</th>
                            <th className="td-quantity">Quantity</th>
                            <th>Total</th>
                            <th>Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productOrder.data &&
                            productOrder.data.map((product) => (
                              <tr key={product.id}>
                                <td className="td-img">
                                  <img
                                    src={
                                      process.env.REACT_APP_STRIPE_APP_DEV_URL +
                                      product.attributes.products[0].attributes
                                        .img.data[0].attributes.url
                                    }
                                    alt=""
                                  ></img>
                                </td>
                                <td className="td-title">
                                  {
                                    product.attributes.products[0].attributes
                                      .title
                                  }
                                </td>
                                <td>
                                  $
                                  {
                                    product.attributes.products[0].attributes
                                      .price
                                  }
                                </td>
                                <td className="td-quantity">
                                  {
                                    product.attributes.products[0].attributes
                                      .quantity
                                  }
                                </td>

                                <td>
                                  $
                                  {product.attributes.products[0].attributes
                                    .price *
                                    product.attributes.products[0].attributes
                                      .quantity}
                                </td>
                                <td>
                                  {formatDate(product.attributes.publishedAt)}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div
                  id="tab_3"
                  style={{
                    display: selectedStore === "tab_3" ? "block" : "none",
                  }}
                >
                  <h3>Address</h3>
                </div>
                <div
                  id="tab_4"
                  style={{
                    display: selectedStore === "tab_4" ? "block" : "none",
                  }}
                >
                  <h3>Change Password</h3>
                  {showSuccessMessage && (
                    <div className="success-message">
                      Successfully Updated. <IoCheckmarkDoneSharp />
                    </div>
                  )}
                  <form className="profile-form" onSubmit={handleChangePass}>
                    <label htmlFor="password">Old Password *</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                    />
                    <label htmlFor="password">New Password *</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={userData.newPassword}
                      onChange={handleChange}
                    />
                    <label htmlFor="password">Confirm New Password *</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={userData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button color="primary" type="submit">
                      Save Change
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
