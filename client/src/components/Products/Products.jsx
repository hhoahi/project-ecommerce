import React, { useState } from "react";
import "./Products.scss";
import Product from "./Product/Product";

const Products = ({ products, innerPage, headingText }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Số lượng sản phẩm trên mỗi trang
  // Kiểm tra xem products có giá trị không
  if (!products || !products.data) {
    return null;
  }
  // Tính toán số lượng trang
  const totalPages = Math.ceil(products.data.length / itemsPerPage);
  // Lấy danh sách sản phẩm cho trang hiện tại
  const getCurrentProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.data.slice(startIndex, endIndex);
  };
  // Handler khi người dùng chuyển trang
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

      {/* Hiển thị các nút phân trang */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              disabled={pageNumber === currentPage}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Products;
