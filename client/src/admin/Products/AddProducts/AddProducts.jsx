import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getDataAdmin } from "../../../utils/api";
import Sidebar from "../../Sidebar/Sidebar";
import "./AddProducts.scss";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const initialProduct = {
  title: "",
  desc: "",
  price: 0,
  img: "",
  categories: "",
};

function CreateProducts({ setShowUserPage }) {
  const [product, setProduct] = useState(initialProduct);
  const [categories, setCategories] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getDataAdmin.get("/api/categories");
        if (response.status === 200) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getDataAdmin.post(
        "http://localhost:1337/api/products",
        {
          data: {
            title: product.title,
            desc: product.desc,
            price: product.price,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        toast.success("Product added successfully!");
        setProduct(initialProduct);
      } else {
        toast.error("Error adding product. Please try again.");
      }
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false); // Tắt thông báo sau 2 giây
      }, 3000);
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
          {showSuccessMessage && (
            <div className="success-message">
              Successfully Updated.
              <IoCheckmarkDoneSharp />
            </div>
          )}
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

            <label>
              Choose a category: {""}
              <select
                name="categories"
                value={product.categories}
                onChange={handleProductChange}
                required
                className="categories-select"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.attributes.title}
                  </option>
                ))}
              </select>
            </label>

            <label>Upload product images</label>

            <button type="submit">Add product</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProducts;
