import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { BiSolidTrash } from "react-icons/bi";
import { CgDetailsMore } from "react-icons/cg";
import "./ViewProducts.scss";
import { getDataAdmin } from "../../../utils/api";

const ITEMS_PER_PAGE = 9;
const stripeAppDevUrl = process.env.REACT_APP_STRIPE_APP_DEV_URL;

function ViewProducts() {
  const [empdata, setEmpdata] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const EditProduct = (id) => {
    navigate("/api/products/" + id);
  };

  const LoadDetail = (id) => {
    navigate("/product/" + id);
  };

  const handleRemove = async (productId) => {
    try {
      const confirmRemove = window.confirm(
        "Do you want to delete this product?"
      );
      if (!confirmRemove) {
        return;
      }
      const response = await getDataAdmin.delete(`/api/products/${productId}`, {
        method: "DELETE",
      });
      if (response.status >= 200 && response.status < 300) {
        const updatedEmpdata = empdata.filter((item) => item.id !== productId);
        setEmpdata(updatedEmpdata);
      } else {
        console.error("Error removing product");
      }
    } catch (error) {
      console.error("Error removing product", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy danh mục từ Strapi (ví dụ: /api/categories)
        const responseCategories = await getDataAdmin.get("/api/categories");
        const categoriesData = await responseCategories.data;

        // Kiểm tra dữ liệu trả về có phải là mảng không
        if (Array.isArray(categoriesData.data)) {
          setCategories(categoriesData.data);
        } else {
          console.error("Categories data is not an array:", categoriesData);
        }

        // Lấy danh sách sản phẩm từ Strapi (ví dụ: /api/products?populate=*)
        const responseProducts = await getDataAdmin.get(
          "/api/products?populate=*"
        );
        const productsData = await responseProducts.data;
        setEmpdata(productsData.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  // Tính chỉ mục bắt đầu và kết thúc của danh sách sản phẩm cho trang hiện tại
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Lấy danh sách sản phẩm cho trang hiện tại
  const currentPageData = empdata
    .filter((item) => {
      if (selectedCategory === "") {
        return true; // Hiển thị tất cả sản phẩm nếu không có danh mục được chọn
      }
      return (
        item.attributes.categories.data[0].id === parseInt(selectedCategory)
      );
    })
    .slice(startIndex, endIndex);

  // Tạo mảng chứa các nút phân trang
  const paginationButtons = [];
  const totalPages = Math.ceil(empdata.length / ITEMS_PER_PAGE);
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        className={currentPage === i ? "active" : ""}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="grid-container">
      <Sidebar />
      <div className="main-container">
        <div className="main-title">
          <div className="container" style={{ textAlign: "center" }}>
            <div className="products-content">
              <div className="card-title">
                <h3>View All Products</h3>
                <div className="category-filter">
                  <label htmlFor="category">Filter by Category: </label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.attributes.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="card-body">
                <div className="products-grid">
                  {currentPageData.map((item) => (
                    <div key={item.id} className="product-card">
                      <div className="product-image">
                        <img
                          src={
                            stripeAppDevUrl +
                            item.attributes.img.data[0].attributes.url
                          }
                          alt={item.attributes.title}
                        />
                      </div>
                      <div className="product-details">
                        <h4>{item.attributes.title}</h4>
                        <p>
                          {item.attributes.desc.length > 300
                            ? `${item.attributes.desc.substring(0, 300)}...`
                            : item.attributes.desc}
                        </p>
                        <p>Price: ${item.attributes.price}</p>
                        <p>
                          Category:{" "}
                          {item.attributes.categories.data[0].attributes.title}
                        </p>
                      </div>
                      <div className="product-actions">
                        <span
                          onClick={() => {
                            EditProduct(item.id);
                          }}
                          className="btn btn-success"
                        >
                          <AiFillEdit />
                        </span>
                        <span
                          onClick={() => {
                            handleRemove(item.id);
                          }}
                          className="btn btn-danger"
                        >
                          <BiSolidTrash />
                        </span>
                        <span
                          onClick={() => {
                            LoadDetail(item.id);
                          }}
                          className="btn btn-primary"
                        >
                          <CgDetailsMore />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pagination">{paginationButtons}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProducts;
