import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDataAdmin } from "../../../utils/api";
import { toast } from "react-toastify";
import Sidebar from "../../Sidebar/Sidebar";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    title: "",
    desc: "",
    price: 0,
  });

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
    // Gọi API để lấy thông tin sản phẩm
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
    try {
      const response = await getDataAdmin.put(
        `http://localhost:1337/api/products/${id}`,
        {
          data: {
            title: product.data.attributes.title,
            desc: product.data.attributes.desc,
            price: product.data.attributes.price,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        toast.success("Product updated successfully!");
        navigate("/products");
      } else {
        toast.error("Error updating product. Please try again.");
      }
    } catch (error) {
      toast.error("Error updating product. Please try again.");
    }
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
