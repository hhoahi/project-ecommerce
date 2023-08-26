import { useNavigate } from "react-router-dom";
import "./Product.scss";

const stripeAppDevUrl = process.env.REACT_APP_STRIPE_APP_DEV_URL;

const Product = ({ id, data }) => {
  const navigate = useNavigate();
  return (
    <div className="product-card" onClick={() => navigate("/product/" + id)}>
      {data.img.data && data.img.data.length > 0 && (
        <img src={stripeAppDevUrl + data.img.data[0].attributes.url} alt="" />
      )}
      <div className="product-detail">
        <p className="name-product">
          {data.title.slice(0, 50)}
          {data.title.length > 50 ? "..." : ""}
        </p>
        <h4 className="price-product">&#x24;{data.price}</h4>
      </div>
    </div>
  );
};

export default Product;
