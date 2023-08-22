import { useEffect, useContext, useCallback } from "react";
import "../styles/Home.scss";

import HeroSlider from "../components/UI/HeroSlider";
import Category from "../components/Category/Categories/Categories";
import Products from "../components/Products/Products";

import { fetchDataFromApi } from "../utils/api";
import { Context } from "../utils/context";

const Home = () => {
  const { categories, setCategories, products, setProducts, setProductAdmin } =
    useContext(Context);

  const getProducts = useCallback(() => {
    fetchDataFromApi("/api/products?populate=*").then((res) => {
      console.log(res);
      setProducts(res);
    });
  }, [setProducts]);

  const getCategories = useCallback(() => {
    fetchDataFromApi("/api/categories?populate=*").then((res) => {
      console.log(res);
      setCategories(res);
    });
  }, [setCategories]);

  const getProductsAdmin = useCallback(() => {
    fetchDataFromApi("/api/products?populate=*").then((res) => {
      console.log(res);
      setProductAdmin(res);
    });
  }, [setProductAdmin]);

  useEffect(() => {
    getProducts();
    getCategories();
  }, [getProducts, getCategories, getProductsAdmin]);

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
