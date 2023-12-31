import { useEffect, useContext, useCallback } from "react";
import Products from "../components/Products/Products";

import "../styles/Categories.scss";
import { fetchDataFromApi } from "../utils/api";
import { Context } from "../utils/context";

function Category() {
  const { products, setProducts } = useContext(Context);

  const getProducts = useCallback(() => {
    fetchDataFromApi("/api/products?populate=*").then((res) => {
      console.log(res);
      setProducts(res);
    });
  }, [setProducts]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div>
      <div className="banner">
        <p>Home/Introduction</p>
        <h2>ADAMSTORE PRODUCTS</h2>
      </div>
      <div className="layout-product">
        <Products products={products} headingText="All Products" />
      </div>
    </div>
  );
}

export default Category;
