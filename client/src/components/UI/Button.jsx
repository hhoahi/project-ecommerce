// JSX code
import React, { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import "../../styles/Button.scss";

function Button() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`scroll-to-top-container ${showButton ? "show" : "hide"}`}>
      <div>
        <button onClick={scrollToTop} className="scroll-to-top">
          <IoIosArrowUp />
        </button>
      </div>
      <div id="hotline">
        <a href="tel:02822618333" className="phone-button">
          <BsFillTelephoneFill />
        </a>
      </div>
    </div>
  );
}

export default Button;
