import React, { useContext, useEffect } from "react";

import { useState } from "react";
import { Context } from "../../utils/context";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [empdata, setEmpdata] = useState([]);
  const navigate = useNavigate();
  // const { productAdmin } = useContext(Context);

  const LoadDetail = (id) => {
    navigate("/api/detail/" + id);
  };
  const LoadEdit = (id) => {
    navigate("/api/edit/" + id);
  };
  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:1337/api/" + id, {
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
    fetch("http://localhost:1337/api/products?populate=*")
      .then((res) => res.json())
      .then((resp) => {
        setEmpdata(resp.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  console.log(empdata);
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <div className="card">
        <div className="card-title">
          <h2>List</h2>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Title</td>
                <td>Desc</td>
                <td>Price</td>
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
                    <td>{item.attributes.price}</td>
                    <td>
                      <a
                        onClick={() => {
                          LoadEdit(item.id);
                        }}
                        className="btn btn-success"
                      >
                        Edit
                      </a>
                      <a
                        onClick={() => {
                          Removefunction(item.id);
                        }}
                        className="btn btn-danger"
                      >
                        Remove
                      </a>
                      <a
                        onClick={() => {
                          LoadDetail(item.id);
                        }}
                        className="btn btn-primary"
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
