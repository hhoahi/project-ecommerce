import { useEffect, useContext, useCallback } from "react";
import "./Home.scss";

import HeroSlider from "./Slider/HeroSlider";
import FindStoreForm from "./FindStore/FindStoreForm";
import Category from "./Category/Category";
import Products from "../Products/Products";

import { Container, Row, Col } from "reactstrap";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";
import {} from "../../assets/store/slideshow_1_master.webp";

const Home = () => {
  const { categories, setCategories, products, setProducts } =
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

  useEffect(() => {
    getProducts();
    getCategories();
  }, [getProducts, getCategories]);

  return (
    <div>
      <div className="p-0 hero__slider-section">
        <HeroSlider />
        <div className="hero__form">
          <Container>
            <Row className="form__row">
              <Col lg="4" md="4">
                <div className="find__stores-left">
                  <h2>Find your best Store here</h2>
                </div>
              </Col>
              <Col lg="8" md="8" sm="12">
                <FindStoreForm />
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <div className="main-content">
        <div className="layout">
          <div className="layout-category">
            <Category categories={categories} />
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
