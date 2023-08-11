import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function EditProducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    // Gọi API để lấy thông tin sản phẩm
    axios
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
      const response = await axios.put(
        `http://localhost:1337/api/products/${id}`,
        product
      );
      if (response.status >= 200 && response.status < 300) {
        toast.success("Product updated successfully!");
        navigate.push("/admin"); // Chuyển hướng về trang danh sách sản phẩm sau khi chỉnh sửa thành công
      } else {
        toast.error("Error updating product. Please try again.");
      }
    } catch (error) {
      toast.error("Error updating product. Please try again.");
    }
  };
  console.log(product);
  return (
    <div>
          {product && product.data && product.data.attributes && (
            <form className="container" onSubmit={handleSubmit}>
              <div className="card-products" style={{ textAlign: "left" }}>
                <div className="card-title">
                  <h2>Edit Product</h2>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>ID</label>
                        <input
                          value={id}
                          disabled="disabled"
                          className="form-control"
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          name="title"
                          value={product.data.attributes.title}
                          onChange={handleProductChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Desc</label>
                        <input
                          type="text"
                          name="desc"
                          value={product.data.attributes.desc}
                          onChange={handleProductChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Price</label>
                        <input
                          type="number"
                          name="price"
                          value={product.data.attributes.price}
                          onChange={handleProductChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <button className="btn btn-success" type="submit">
                          Save
                        </button>
                        <Link to="/admin" className="btn btn-danger">
                          Back
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
    </div>
  );
}

export default EditProducts;
