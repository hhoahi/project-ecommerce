import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const initialProduct = {
  title: "",
  desc: "",
  price: 0,
  img: "",
  categories: "",
};

const Create = () => {
  const [id, idchange] = useState("");
  const [product, setProduct] = useState(initialProduct);


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
      const response = await axios.post("http://localhost:1337/api/products", {
        data: {
          title: product.title,
          desc: product.desc,
          price: product.price,
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
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Employee Create</h2>
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
                        value={product.title}
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
                        value={product.desc}
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
                        value={product.price}
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
        </div>
      </div>
    </div>
  );
};

export default Create;
