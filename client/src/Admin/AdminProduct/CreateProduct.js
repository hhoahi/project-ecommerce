import { useState } from "react";
import axios from "axios";

const initialProduct = {
  title: "",
  desc: "",
  price: 0,
  img: "",
  categories: "",
};
const CreateProduct = () => {
  const [product, setProduct] = useState(initialProduct);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("desc", product.desc);
      formData.append("price", product.price);
      formData.append("image", product.img);

      const response = await axios.post(
        "http://localhost:1337/api/products?populate=*",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Product added successfully!");
        // Reset form fields
        setTitle("");
        setDesc("");
        setPrice(0);
        setImage(null);
      } else {
        console.error("Error adding product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product. Please try again.", error);
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <div>
          <button type="submit">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
