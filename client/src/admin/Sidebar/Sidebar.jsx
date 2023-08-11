import React from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom"; 
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> ADAMSTORE
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/admin">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/">
            <BsFillGrid3X3GapFill className="icon" /> Categories
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/">
            <BsMenuButtonWideFill className="icon" /> Browse Categories
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/api/products">
            <BsListCheck className="icon" /> Add Products
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/products/">
            <BsFillArchiveFill className="icon" /> View Products
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/">
            <BsFillGearFill className="icon" /> New User Requests
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/">
            <BsPeopleFill className="icon" /> View User
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
