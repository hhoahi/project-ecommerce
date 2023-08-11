import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { BiSolidTrash } from "react-icons/bi";
import { CgDetailsMore } from "react-icons/cg";
import "./Products.scss";

const stripeAppDevUrl = process.env.REACT_APP_STRIPE_APP_DEV_URL;

function Products() {
  const [empdata, setEmpdata] = useState([]);
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/product/" + id);
  };
  // const LoadEdit = (id) => {
  //   navigate("/api/products/:id" + id);
  // };

  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:1337/api/products?populate=*/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/products?populate=*"
        );
        const data = await response.json();
        setEmpdata(data.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);
  console.log(empdata);

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
                      <td>Image</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {empdata &&
                      empdata.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.attributes.title}</td>
                          <td>{item.attributes.desc}</td>
                          <td>${item.attributes.price}</td>
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
                            <Link
                              to={`/api/products/${item.id}`}
                              className="btn btn-success"
                            >
                              <AiFillEdit />
                            </Link>
                            <span
                              onClick={() => {
                                Removefunction(item.id);
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
