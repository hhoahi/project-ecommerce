import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const storeUser = (data) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      user: data.user,
      jwt: data.jwt,
    })
  );
};

export const userData = () => {
  const stringifiedUser = localStorage.getItem("user") || '""';
  return JSON.parse(stringifiedUser || {});
};

export const getToken = () => {
  const token = JSON.parse(localStorage.getItem("user"));
  const jwt = token?.jwt;
  return jwt;
};

export const getUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const userProfile = user?.user;
  return userProfile;
};

export const Protector = ({ Component }) => {
  const navigate = useNavigate();

  const { jwt } = userData();

  useEffect(() => {
    if (!jwt) {
      navigate("/login");
    }
  }, [navigate, jwt]);

  return <Component />;
};
