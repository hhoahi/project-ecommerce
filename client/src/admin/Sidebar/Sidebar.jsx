import React, { useContext } from "react";
import { Context } from "../../utils/context";
import "./Sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsBoxArrowRight,
} from "react-icons/bs";
import { BiSolidUserPlus } from "react-icons/bi";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  // const [isLogin, setIsLogin] = useState(false);
  const { setIsOpen, setIsLogin } = useContext(Context);
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    setIsLogin(false);
    setIsOpen(false);
    navigate("/");
  }

  return (
    <div id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
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
          <Link to="/admin/categories/">
            <BsFillGrid3X3GapFill className="icon" /> Categories
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/admin/categories/new-category">
            <BsMenuButtonWideFill className="icon" /> Add Categories
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/admin/products/">
            <BsFillArchiveFill className="icon" /> View Products
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/admin/products/new-product">
            <BsListCheck className="icon" /> Add Products
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/admin/users/">
            <BsPeopleFill className="icon" /> User Management
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/admin/users/add-user">
            <BiSolidUserPlus className="icon" /> Add User
          </Link>
        </li>

        <li className="sidebar-list-item" onClick={handleLogout}>
          <Link>
            <BsBoxArrowRight className="icon" /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
