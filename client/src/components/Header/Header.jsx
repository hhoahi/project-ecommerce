import { useEffect, useState, useContext } from "react";
import Dropdown from "react-dropdown";
import { useNavigate } from "react-router-dom";

import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineUser } from "react-icons/ai";


import Search from "./Search/Search";
import Cart from "./Cart/Cart";
import Profile from "../Profile/Profile";
import logo from "../../assets/logo.jpg";
import { debounce } from "lodash";
import { Context } from "../../utils/context";

import "react-dropdown/style.css";
import "./Header.scss";

const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { cartCount, isOpen, setIsOpen } = useContext(Context);

  
  const [scrolled, setScrolled] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();
  const options = [
    { label: "CATEGORIES", value: "/categories" },
    { label: "T-SHIRT", value: "/category/1" },
    { label: "SUIT", value: "/category/2" },
    { label: "SHIRT", value: "/category/3" },
    { label: "TROUSERS", value: "/category/4" },
  ];

  const handleOptionChange = (option) => {
    navigate(option.value);
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  function handleClick() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 10);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    console.log(userInfo);
    if (userInfo) {
      setIsLogin(true);
    } else {
      return null
    }
  }, []);

  function handleLogin() {
    localStorage.setItem("userInfo", "true");
    setIsLogin(true);
    setIsOpen(false);
  }

  function handleLogout() {
    localStorage.clear();
    // localStorage.removeItem('userInfo');
    navigate('/')
    setIsLogin(false);
    
  }

  return (
    <div>
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-top">
          <button onClick={() => navigate("/location")}>
            <span>5</span> STORE SYSTEM
          </button>
        </div>
        <div className="header-content">
          <ul className="left">
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/about")}>About</li>
            <li onClick={() => navigate("/blog")}>LookBook</li>
            <li>
              <Dropdown
                options={options}
                placeholder="Categories"
                onChange={(option) => handleOptionChange(option)}
              />
            </li>
          </ul>

          <div className="center" onClick={() => navigate("/")}>
            <img src={logo} width={165} height={50} alt="" />
          </div>

          <ul className="right">
            <li>
              <TbSearch onClick={() => setShowSearch(true)} />
            </li>
            {isLogin ? (
              // if user is logged in, show profile button and dropdown menu
              <li className="nav-right-btn">
                <AiOutlineUser className="icon-profile" onClick={handleClick} />
                {isOpen && (
                  <div className="dropdown-content">
                    <Profile />
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </li>
            ) : (
              // if user is not logged in, show login and register buttons
              <li className="nav-right-btn">
                <AiOutlineUser className="icon-profile" onClick={handleClick} />
                {isOpen && (
                  <div className="dropdown-content">
                    <div onClick={() => navigate("/login")}>
                      <span className="btn-dropdown" onClick={handleLogin}>
                        Sign In
                      </span>
                    </div>
                    <div onClick={() => navigate("/admin")}>
                      <span className="btn-dropdown">Admin</span>
                    </div>
                  </div>
                )}
              </li>
            )}

            <li className="cart-icon" onClick={() => setShowCart(true)}>
              <CgShoppingCart />
              {!!cartCount && <span>{cartCount}</span>}
            </li>

            <li className="toggle-menu" onClick={() => setShowMenu(!showMenu)}>
              <span></span>
              <span></span>
              <span></span>
            </li>
          </ul>
        </div>
      </header>
      {showCart && <Cart setShowCart={setShowCart} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
      {showMenu && (
        <div className="menu">
          <ul>
            <li
              onClick={() => {
                navigate("/");
                setShowMenu(false);
              }}
            >
              Home
            </li>
            <li
              onClick={() => {
                navigate("/about");
                setShowMenu(false);
              }}
            >
              About
            </li>
            <li
              onClick={() => {
                navigate("/blog");
                setShowMenu(false);
              }}
            >
              LookBook
            </li>
            <li>
              <Dropdown
                options={options}
                placeholder="Categories"
                onChange={(option) => handleOptionChange(option)}
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
