import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { BiSolidTrash } from "react-icons/bi";
import { CgDetailsMore } from "react-icons/cg";
import "./ViewProducts.scss";
import { getDataAdmin } from "../../../utils/api";

const stripeAppDevUrl = process.env.REACT_APP_STRIPE_APP_DEV_URL;

function Products() {
  const [empdata, setEmpdata] = useState([]);
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
        const response = await getDataAdmin.get("/api/products?populate=*");
        const data = await response.data;
        setEmpdata(data.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid-container">
      <Sidebar />
      <div className="main-container">
        <div className="main-title">
          <div className="container" style={{ textAlign: "center" }}>
            <div className="products-content">
              <div className="card-title">
                <h3>View All Product</h3>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead className="bg-dark text-white">
                    <tr>
                      <td>ID</td>
                      <td>Title</td>
                      <td>Desc</td>
                      <td>Price</td>
                      <td>Category</td>
                      <td>Image</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {empdata?.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.attributes.title}</td>
                        <td>
                          {item.attributes.desc.length > 300
                            ? `${item.attributes.desc.substring(0, 300)}...`
                            : item.attributes.desc}
                        </td>
                        <td>${item.attributes.price}</td>
                        <td>
                          {item.attributes.categories.data[0].attributes.title}
                        </td>
                        <td>
                          <img
                            src={
                              stripeAppDevUrl +
                              item.attributes.img.data[0].attributes.url
                            }
                            alt=""
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
