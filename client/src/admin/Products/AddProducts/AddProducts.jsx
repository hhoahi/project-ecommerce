import { useState, useEffect } from "react";
import { getDataAdmin } from "../../../utils/api";
import "./AddProducts.scss";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const initialProduct = {
  title: "",
  desc: "",
  price: 0,
  categories: "",
};

function AddProducts({ setShowUserPage }) {
  const [product, setProduct] = useState(initialProduct);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const token = JSON.parse(localStorage.getItem("user"));
  const jwt = token?.jwt;

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

    const formData = new FormData();
    formData.append("files", image);

    try {
      console.log(formData);
      const uploadResponse = await getDataAdmin.post("/api/upload", formData, {
        mode: "no-cors",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log(uploadResponse);

      const response = await getDataAdmin.post(
        "/api/products",
        {
          data: {
            title: product.title,
            desc: product.desc,
            price: product.price,
            categories: product.categories,
            img: uploadResponse.data[0].id,
          },
        },
        {
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        console.log("Success");
      }
      setShowSuccessMessage(true);
      const timeout = setTimeout(() => {
        setShowSuccessMessage(false); // Tắt thông báo sau 2 giây
      }, 3000);
      return () => {
        // 👇️ clear timeout when the component unmounts
        clearTimeout(timeout);
      };
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="grid-container">
      <div className="main-content">
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
            <input
              type="file"
              onChange={handleFileChange}
              className="input-img"
              id="file-input"
            />
            <div className="media-img">
              {imageUrl && <img src={imageUrl} alt="Selected Image" />}
            </div>
            <button type="submit" value="Upload">
              Add product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProducts;
