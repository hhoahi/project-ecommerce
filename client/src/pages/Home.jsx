import { useEffect, useContext } from "react";
import "../styles/Home.scss";

import HeroSlider from "../components/UI/HeroSlider";
import Category from "../components/Category/Categories/Categories";
import Products from "../components/Products/Products";

import { Context } from "../utils/context";
import axios from "axios";

const Home = () => {
  const { categories, setCategories, products, setProducts, setProductAdmin } =
    useContext(Context);

  const getProducts = async () => {
    const response = await axios.get(
      "http://localhost:1337/api/products?populate=*"
    );
    setProducts(response.data);
  };

  const getCategories = async () => {
    const response = await axios.get(
      "http://localhost:1337/api/categories?populate=*"
    );
    setCategories(response.data);
  };

  const getProductsAdmin = async () => {
    const response = await axios.get(
      "http://localhost:1337/api/products?populate=*"
    );
    setProductAdmin(response.data);
  };

  useEffect(() => {
    getProducts();
    getCategories();
    getProductsAdmin();
  }, []);

  return (
    <div className="background-layout">
      <div className="hero__slider-section">
        <HeroSlider />
      </div>

      <div className="main-home">
        <div className="layout">
          <div className="layout-category">
            <Category categories={categories} />
          </div>
          <div className="layout-join">
            <h2>About us</h2>
            <p>
              Adam Store was born in 2012, starting from a small shop on Lò Đúc
              Street.
              <br />
              In its early days, Adam Store was built by three young men,
              carrying within them the aspiration to change the fashion trends
              of Vietnam.
            </p>
            <button>Join Now</button>
          </div>
          <div className="layout-product">
            <Products products={products} headingText="Popular Products" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
