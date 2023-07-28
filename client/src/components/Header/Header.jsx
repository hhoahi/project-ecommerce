import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";

import Search from "./Search/Search";
import Cart from "../Cart/Cart";
import User from "./User/User";
import { debounce } from "lodash";
import { Context } from "../../utils/context";

import "./Header.scss";

const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showUserPage, setShowUserPage] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useContext(Context);
  const navigate = useNavigate();

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 10);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  return (
    <div>
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/about")}>About</li>
            <li>Categories</li>
          </ul>
          <div className="center" onClick={() => navigate("/")}>
            ADAMSTORE
          </div>
          <div className="right">
            <TbSearch onClick={() => setShowSearch(true)} />

            <AiOutlineHeart />

            <span className="cart-icon" onClick={() => setShowCart(true)}>
              <CgShoppingCart />
              {!!cartCount && <span>{cartCount}</span>}
            </span>

            <AiOutlineUser onClick={() => setShowUserPage(true)} />
          </div>
        </div>
      </header>
      {showCart && <Cart setShowCart={setShowCart} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
      {showUserPage && <User setShowUserPage={setShowUserPage} />}
    </div>
  );
};

export default Header;
