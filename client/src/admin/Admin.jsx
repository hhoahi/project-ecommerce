import { useEffect, useState } from "react";
import "./Admin.scss";
import Sidebar from "./Sidebar/Sidebar";
import Dashboard from "./Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/api";

function Admin() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const navigate = useNavigate();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("user"))?.user.username;
    if (role !== "admin" && window.location.pathname === "/admin") {
      navigate("/");
      console.log(true);
    }
    // const fetchData = async () => {
    //   const res = await getCurrentUser();
    //   console.log(res.data);
    // };
    // fetchData();
  }, []);

  const role = JSON.parse(localStorage.getItem("user"))?.user.username;
  return (
    role === "admin" && (
      <div className="grid-container">
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <Dashboard />
      </div>
    )
  );
}

export default Admin;
