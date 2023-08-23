import { useEffect, useState } from "react";
import "./Admin.scss";
import Sidebar from "./Sidebar/Sidebar";
import Dashboard from "./Dashboard/Dashboard";
import { Outlet, useNavigate } from "react-router-dom";

function Admin() {
  const [isAdminRole, setIAdminRole] = useState();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const navigate = useNavigate();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    const isAdminRole = isAdmin === true;
    setIAdminRole(isAdminRole);
    console.log(isAdminRole);
    if (!isAdminRole) {
      navigate("/");
    }
  }, [navigate]);

  return (
    isAdminRole === true && (
      <div className="admin-page">
        <div className="slider-bar">
          <Sidebar
            openSidebarToggle={openSidebarToggle}
            OpenSidebar={OpenSidebar}
          />
        </div>
        <div className="admin-body">
          <Outlet />
        </div>
      </div>
    )
  );
}

export default Admin;
