import React from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import Newsletter from "../components/Footer/Newsletter/Newsletter";
import Footer from "../components/Footer/Footer";
import Button from "../components/UI/Button";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Newsletter />
      <Footer />
      <Button />
    </>
  );
};

export default Layout;
