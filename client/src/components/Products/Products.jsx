import React, { useState } from "react";
import "./Products.scss";
import Product from "./Product/Product";

import { IoIosArrowForward } from "react-icons/io";


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
                  <IoIosArrowForward />
                </span>
              ) : index === 3 ? (
                <span>
                  <IoIosArrowForward />
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
