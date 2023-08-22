import React, { useState } from "react";
import "./Products.scss";
import Product from "./Product/Product";
<<<<<<< HEAD
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
=======

import { IoIosArrowForward } from "react-icons/io";

>>>>>>> 277d0e95880894e0f21b8be39b554e2da580376a

const Products = ({ products, innerPage, headingText }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  if (!products || !products.data) {
    return null;
  }

  const totalPages = Math.ceil(products.data.length / itemsPerPage);

  const getCurrentProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.data.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="products-container">
      {!innerPage && <div className="sec-heading">{headingText}</div>}
      <div className="products">
        {getCurrentProducts().map((item) => (
          <Product key={item.id} id={item.id} data={item.attributes} />
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber, index, array) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              disabled={pageNumber === currentPage}
            >
              {index === 2 ? (
                <span>
                  <MdOutlineKeyboardArrowRight />
                </span>
              ) : index === 3 ? (
                <span>
                  <MdOutlineKeyboardDoubleArrowRight />
                </span>
              ) : (
                pageNumber
              )}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Products;
