import "./Category.scss";
import Product from "../Products/Products";

const Category = () => {
  return (
    <div className="category-main-content">
      <div className="layout">
        <div className="category-title">Category Title</div>
        <Product innerPage={true} />
      </div>
    </div>
  );
};

export default Category;
