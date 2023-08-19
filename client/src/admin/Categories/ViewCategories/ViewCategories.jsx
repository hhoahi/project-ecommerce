import React, { useState, useEffect } from "react";
import { getDataAdmin } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { BiSolidTrash } from "react-icons/bi";
import Sidebar from "../../Sidebar/Sidebar";
import "./ViewCategories.scss";

const stripeAppDevUrl = process.env.REACT_APP_STRIPE_APP_DEV_URL;

function ViewCategories() {
  const [empdata, setEmpdata] = useState([]);
  const navigate = useNavigate();

  const EditProduct = (id) => {
    navigate("/api/categories/" + id);
  };

  const handleRemove = async (categoriesId) => {
    try {
      const confirmRemove = window.confirm(
        "Do you want to delete this category?"
      );
      if (!confirmRemove) {
        return;
      }
      const response = await getDataAdmin.delete(
        `/api/categories/${categoriesId}`,
        {
          method: "DELETE",
        }
      );
      if (response.status >= 200 && response.status < 300) {
        const updatedEmpdata = empdata.filter(
          (item) => item.id !== categoriesId
        );
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
        const response = await getDataAdmin.get("/api/categories?populate=*");
        const data = await response.data;
        setEmpdata(data.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const totalProducts = (item) => item.attributes.products.data.length;

  console.log(empdata);
  return (
    <div className="grid-container">
      <Sidebar />
      <div className="main-container">
        <div className="main-title">
          <div className="container" style={{ textAlign: "center" }}>
            <div className="products-content">
              <h3>View All Categories</h3>
              <div className="category-container">
                {empdata?.map((item) => (
                  <div key={item.id} className="category-card">
                    <div className="category-header">
                      <h5>{item.attributes.title}</h5>
                      <div className="category-actions">
                        <span
                          onClick={() => {
                            EditProduct(item.id);
                          }}
                        >
                          <AiFillEdit className="admin-icon" />
                        </span>
                        <span
                          onClick={() => {
                            handleRemove(item.id);
                          }}
                        >
                          <BiSolidTrash className="admin-icon" />
                        </span>
                      </div>
                    </div>
                    {item.attributes.img && item.attributes.img.data && (
                      <div className="category-image">
                        <img
                          src={
                            stripeAppDevUrl +
                            item.attributes.img.data.attributes.url
                          }
                          alt=""
                        />
                      </div>
                    )}
                    <div className="category-footer">
                      <div className="category-products">
                        <select className="custom-select">
                          <option value="">{totalProducts(item)} items</option>
                          {item.attributes.products.data.map((product) => (
                            <option
                              key={product.id}
                              value={product.id}
                              disabled
                            >
                              {product.attributes.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="category-create-date">
                        {formatDate(item.attributes.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCategories;
