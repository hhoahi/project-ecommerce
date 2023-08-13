import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { fetchData } from "../../utils/api";

const stripeAppDevUrl = process.env.REACT_APP_STRIPE_APP_DEV_URL;

const CategoryList = () => {
  const [empdata, setEmpdata] = useState([]);
  const [listProduct, setListProduct] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null); // Thêm trạng thái để theo dõi danh mục được chọn
  const [selectedCategoryProducts, setSelectedCategoryProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/api/categories?populate=*")
      .then((res) => res.json())
      .then((resp) => {
        setEmpdata(resp.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  console.log(empdata);

  const handleShowProducts = async (categoryId) => {
    try {
      const response = await fetchData.get(
        `http://localhost:1337/api/categories/${categoryId}?populate=products`
      );
      const dataProduct = response.data;
      setListProduct(dataProduct.data);
      console.log(listProduct);
    } catch (error) {
      console.error("Error fetching category data", error);
    }
  };

  const handleRemove = async (categoryId) => {
    try {
      const confirmRemove = window.confirm(
        "Are you sure you want to remove this product?"
      );
      if (!confirmRemove) {
        return;
      }

      const response = await fetch(
        `http://localhost:1337/api/categories/${categoryId}`,
        {
          method: "DELETE",
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const updatedEmpdata = empdata.filter((item) => item.id !== categoryId);
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

  console.log(selectedCategory);
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
            <Link to="/productlist" className="btn btn-success">
              Product
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Title</td>
                <td>Products</td>
                <td>img</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {empdata &&
                empdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.attributes.title}</td>
                    <td>{item.attributes.products.data[0].attributes.title}</td>
                    <td>
                      <a
                        className="btn btn-primary"
                        onClick={() => handleShowProducts(item.id)} // Gọi sự kiện để hiển thị sản phẩm
                      >
                        Products
                      </a>
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
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Hiển thị danh sách sản phẩm */}
          {selectedCategory && (
            <div>
              <h3>Products in Selected Category:</h3>
              <ul>
                {selectedCategory?.map((product) => ({
                  /* <li key={product.id}>{product.attributes.products.data[0].attributes.title}</li> */
                }))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
