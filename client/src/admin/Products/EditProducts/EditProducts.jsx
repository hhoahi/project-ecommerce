import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDataAdmin } from "../../../utils/api";
import Sidebar from "../../Sidebar/Sidebar";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [product, setProduct] = useState({
    title: "",
    desc: "",
    price: 0,
    categories: "",
  });

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

  useEffect(() => {
    getDataAdmin
      .get(`http://localhost:1337/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      data: {
        ...prevProduct.data,
        attributes: {
          ...prevProduct.data.attributes,
          [name]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append("files", image);
    }
    try {
      let uploadResponse;
      if (image) {
        uploadResponse = await getDataAdmin.post("/api/upload", formData, {
          mode: "no-cors",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwt}`,
          },
        });
      }
      const response = await getDataAdmin.put(
        `http://localhost:1337/api/products/${id}`,
        {
          data: {
            title: product.data.attributes.title,
            desc: product.data.attributes.desc,
            price: product.data.attributes.price,
            categories: product.data.attributes.categories,
            img: image
              ? uploadResponse.data[0].id
              : product.data.attributes.img,
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
      if (response.status >= 200 && response.status < 300) {
        navigate("/products");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  console.log(product);
  return (
    <div className="grid-container">
      <Sidebar />
      <div className="main-container">
        {product && product.data && product.data.attributes && (
          <form className="container-create" onSubmit={handleSubmit}>
            <h3>Edit Product</h3>
            <div className="card-body">
              <label>ID</label>
              <input
                value={id}
                disabled="disabled"
                className="form-control"
              ></input>

              <label>Product name</label>
              <input
                type="text"
                name="title"
                value={product.data.attributes.title}
                onChange={handleProductChange}
                required
              />

              <label>Product description</label>
              <input
                type="text"
                name="desc"
                value={product.data.attributes.desc}
                onChange={handleProductChange}
                required
              />

              <label>Price</label>
              <input
                type="number"
                name="price"
                value={product.data.attributes.price}
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

              <button className="btn btn-success" type="submit">
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Edit;
