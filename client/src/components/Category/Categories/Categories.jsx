import "./Categories.scss";
import { useNavigate } from "react-router-dom";

const stripeAppDevUrl = process.env.REACT_APP_STRIPE_APP_DEV_URL;

const Category = ({ categories }) => {
  const navigate = useNavigate();
  return (
    <div className="shop-by-category">
      <div className="categories">
        {categories &&
          categories.data &&
          categories.data.map((item) => (
            <div
              key={item.id}
              className="category"
              onClick={() => navigate(`/category/${item.id}`)}
            >
              <img
                src={
                  stripeAppDevUrl + item?.attributes?.img?.data?.attributes?.url
                }
                alt=""
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Category;
