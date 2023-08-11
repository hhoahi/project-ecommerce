import React from "react";
import "./Footer.scss";
import Payment from "../../assets/payments.png";
import { Link } from "react-router-dom";
import { CgPhone } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import logo from "../../assets/logo.jpg";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="col">
          <div className="title">
            <img src={logo} alt=""></img>
          </div>
          <div className="text">
            <CgPhone />
            0388590810
          </div>
          <div className="text">
            <MdEmail /> Adamstorevn@gmail.com
          </div>
          <div className="text">Số 243 Nguyễn Thị Thập, Tân Phú, Q7</div>
        </div>

        <div className="col">
          <h3 className="title">Pages</h3>
          <div className="text">
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              Home
            </Link>
          </div>
          <div className="text">
            <Link
              to="/about"
              style={{ textDecoration: "none", color: "black" }}
            >
              About
            </Link>
          </div>
          <div className="text">
            <Link
              to="/lookbook"
              style={{ textDecoration: "none", color: "black" }}
            >
              LookBook
            </Link>
          </div>
        </div>

        <div className="col">
          <h3 className="title">Categories</h3>
          <div className="text">
            <Link
              to="/category/1"
              style={{ textDecoration: "none", color: "black" }}
            >
              T-Shirt
            </Link>
          </div>
          <div className="text">
            <Link
              to="/category/2"
              style={{ textDecoration: "none", color: "black" }}
            >
              Suit
            </Link>
          </div>
          <div className="text">
            <Link
              to="/category/3"
              style={{ textDecoration: "none", color: "black" }}
            >
              Shirt
            </Link>
          </div>
          <div className="text">
            <Link
              to="/category/4"
              style={{ textDecoration: "none", color: "black" }}
            >
              Trousers
            </Link>
          </div>
        </div>

        <div className="bottom-bar-content">
          <h3 className="text">ADAMSTORE</h3>
          <img src={Payment} alt="" />
        </div>
      </div>
      <div className="footer-copyright text-center">
        Copyrights © 2018 by {""}
        <a target="_blank" href="http://adamstorevn.com">
          Adamstore
        </a>
      </div>
    </footer>
  );
};

export default Footer;
