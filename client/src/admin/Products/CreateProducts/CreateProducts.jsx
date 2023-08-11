import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../../Sidebar/Sidebar";
import "./CreateProducts.scss";

const initialProduct = {
  title: "",
  desc: "",
  price: 0,
  img: "",
  categories: "",
};

function CreateProducts({ setShowUserPage }) {
  const [id, idchange] = useState("");
  const [product, setProduct] = useState(initialProduct);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // const handleImageChange = (event) => {
  //   const selectedImage = event.target.files[0];
  //   setProduct((prevProduct) => ({
  //     ...prevProduct,
  //     image: selectedImage,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1337/api/products", {
        data: {
          title: product.title,
          desc: product.desc,
          price: product.price,
          // img: product.img,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        toast.success("Product added successfully!");
        setProduct(initialProduct);
      } else {
        toast.error("Error adding product. Please try again.");
      }
    } catch (error) {
      toast.error("Error adding product. Please try again.");
    }
  };

  console.log(product);

  return (
    <div className="grid-container">
      <Sidebar />
      <div className="main-container">
        <form className="container-create" onSubmit={handleSubmit}>
          <h3>Add Products</h3>
          <div className="card-body">
            <label>Product name</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleProductChange}
              required
            />
            <label>Product description</label>
            <input
              type="text"
              name="desc"
              value={product.desc}
              onChange={handleProductChange}
              required
            />
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleProductChange}
              required
            />
            <label>Choose a category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleProductChange}
              required
            ></select>
            <label>Upload product images</label>
            <input
              type="file"
              name="img"
              accept="image/*"
              // onChange={handleImageChange}
              required
            />

            <button type="submit">Add product</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProducts;
