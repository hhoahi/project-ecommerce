import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const stripeAppDevUrl = process.env.REACT_APP_STRIPE_APP_DEV_URL;

const ProductList = () => {
  const [empdata, setEmpdata] = useState([]);

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

  const handleRemove = async (productId) => {
    try {
      const confirmRemove = window.confirm(
        "Are you sure you want to remove this product?"
      );
      if (!confirmRemove) {
        return;
      }

      const response = await fetch(
        `http://localhost:1337/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const updatedEmpdata = empdata.filter((item) => item.id !== productId);
        setEmpdata(updatedEmpdata);
        toast.success("Product removed successfully");
      } else {
        console.error("Error removing product");
        toast.error("Error removing product");
      }
    } catch (error) {
      console.error("Error removing product", error);
      toast.error("Error removing product");
    }
  };

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <div className="card">
        <div className="card-title">
          <h2>List</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="/api/products" className="btn btn-success">
              Add New (+)
            </Link>
          </div>

          <div className="divbtn">
            <Link to="/admin/category" className="btn btn-success">
              category
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Categogy</td>
                <td>Title</td>
                <td>Desc</td>
                <td>Price</td>
                <td>img</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {empdata &&
                empdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      {item.attributes?.categories?.data?.attributes?.title}
                    </td>
                    <td>{item.attributes.title}</td>
                    <td>{item.attributes.desc}</td>
                    <td>{item.attributes.price}</td>
                    <td>
                      <img
                        src={
                          stripeAppDevUrl +
                          item.attributes.img.data[0].attributes.url
                        }
                        alt=""
                        style={{ width: "100px", height: "100px" }}
                      />
                    </td>

                    <td>
                      <Link
                        to={`/api/products/${item.id}`}
                        className="btn btn-success"
                      >
                        Edit
                      </Link>

                      <a
                        className="btn btn-danger"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </a>
                      <a className="btn btn-primary">Details</a>
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

export default ProductList;
