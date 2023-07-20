import { useEffect } from "react";
import "./Home.scss";

import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { fetchDataFromApi } from "../../utils/api";

const Home = () => {
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    fetchDataFromApi("/api/categories").then((res) => console.log(res));
  };

  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
          <div className="layout-category">
            <Category />
          </div>
          <div className="layout-product">
            <Products headingText="Popular Products" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
