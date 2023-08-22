import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Giả định dữ liệu sản phẩm
  const initialProduct = {
    title: "Product Title",
    desc: "Product Description",
    price: 100,
    // ...Thêm các thuộc tính khác
  };

  const [product, setProduct] = useState(initialProduct);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu sản phẩm đã chỉnh sửa lên API Strapi
    // Thực hiện logic gửi dữ liệu và xử lý kết quả sau khi cập nhật thành công
    // Sau khi cập nhật thành công, có thể navigate đến trang chi tiết sản phẩm
    navigate(`/product/${id}`);
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="desc"
            value={product.desc}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
          />
        </div>
        {/* Thêm các trường dữ liệu khác của sản phẩm */}
        <div>
          <button type="submit">Save Changes</button>
          <Link to={`/product/${id}`}>Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
