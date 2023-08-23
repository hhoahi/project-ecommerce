import React, { useEffect, useState } from "react";
import { getData } from "../../utils/api";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsCurrencyDollar,
} from "react-icons/bs";
import { ResponsiveContainer } from "recharts";

import CustomBarChart from "./Chart/CustomBarChart";
import CustomLineChart from "./Chart/CustomLineChart";
import "./Dashboard.scss";

function Home() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchDataOrder();
    fetchDataProduct();
    fetchDataCategories();
  }, []);

  const fetchDataOrder = async () => {
    try {
      const response = await getData.get("/api/orders");
      const data = response.data;
      setOrders(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchDataProduct = async () => {
    try {
      const response = await getData.get("/api/products");
      const data = response.data;
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchDataCategories = async () => {
    try {
      const response = await getData.get("/api/categories");
      const data = response.data;
      setCategories(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const calculateTotalRevenue = () => {
    let totalRevenue = 0;

    if (orders && orders.data && orders.data.length > 0) {
      orders.data.forEach((order) => {
        const products = order.attributes.products;
        if (products && products.length > 0) {
          const productPrice = products[0].attributes.price;
          const quantity = products[0].attributes.quantity;

          if (productPrice !== undefined && quantity !== undefined) {
            const revenue = productPrice * quantity;
            totalRevenue += revenue;
          }
        }
      });
    }

    return totalRevenue;
  };

  return (
    <main className="main-home">
      <div className="main-title">
        <h3>STATISTICAL</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          {isLoading ? (
            <p>Loading products...</p>
          ) : (
            <div>
              <div className="card-inner">
                <h3>PRODUCTS</h3>
                <BsFillArchiveFill className="card_icon" />
              </div>
              <h1>{products?.data?.length}</h1>
            </div>
          )}
        </div>

        <div className="card">
          {isLoading ? (
            <p>Loading categories..</p>
          ) : (
            <div>
              <div className="card-inner">
                <h3>CATEGORIES</h3>
                <BsFillGrid3X3GapFill className="card_icon" />
              </div>
              <h1>{categories?.data?.length}</h1>
            </div>
          )}
        </div>

        <div className="card">
          {isLoading ? (
            <p>Loading order..</p>
          ) : (
            <div>
              <div className="card-inner">
                <h3>ORDER</h3>
                <BsPeopleFill className="card_icon" />
              </div>
              <h1>{orders.data?.length}</h1>
            </div>
          )}
        </div>

        <div className="card">
          {isLoading ? (
            <p>Loading revenue..</p>
          ) : (
            <div>
              <div className="card-inner">
                <h3>REVENUE</h3>
                <BsCurrencyDollar className="card_icon" />
              </div>
              <h1>${calculateTotalRevenue()}</h1>
            </div>
          )}
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <CustomBarChart orders={orders} />
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <CustomLineChart orders={orders} />
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
