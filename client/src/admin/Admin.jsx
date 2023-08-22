import { useState } from "react";
import "./Admin.scss";
import Sidebar from "./Sidebar/Sidebar";
import Dashboard from "./Dashboard/Dashboard";

function Admin() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const role = JSON.parse(localStorage.getItem("user"))?.user.username;
  return role=== "admin" && (
    <div className="grid-container">
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <Dashboard />
    </div>
  );
}

export default Admin;
