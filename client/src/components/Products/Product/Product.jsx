import { useNavigate } from "react-router-dom";
import "./Product.scss";

const stripeAppDevUrl = process.env.REACT_APP_STRIPE_APP_DEV_URL;

const Product = ({ id, data }) => {
  const navigate = useNavigate();
  return (
    <div className="product-card" onClick={() => navigate("/product/" + id)}>
      <div className="thumbnail">
        <img src={stripeAppDevUrl + data.img.data[0].attributes.url} alt="" />
      </div>
      <div className="prod-detail">
        <span className="name">
          {data.title.slice(0, 30)}
          {data.title.length > 30 ? "..." : ""}
        </span>
        <br />
        <span className="price">&#x24;{data.price}</span>
      </div>
    </div>
  );
};



export default Product;
