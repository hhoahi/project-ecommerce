import { useState, useContext } from "react";
import RelatedProducts from "./RelatedProducts";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from "react-icons/fa";
import "../styles/SingleProduct.scss";

import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../utils/context";

const stripeAppDevUrl = process.env.REACT_APP_STRIPE_APP_DEV_URL;

const SingleProduct = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { data } = useFetch(`/api/products?populate=*&[filters][id]=${id}`);
  const { handleAddToCart } = useContext(Context);

  const increment = () => {
    setQuantity((prevState) => prevState + 1);
  };
  const decrement = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });
  };

  if (!data) return;
  const product = data?.data?.[0]?.attributes;

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            {product &&
              product.img &&
              product.img.data &&
              product.img.data[0] && (
                <img
                  src={stripeAppDevUrl + product.img.data[0].attributes.url}
                  alt=""
                />
              )}
          </div>

          <div className="right">
            {product ? (
              <>
                <span className="name">{product?.title}</span>
                <span className="price">&#x24;{product?.price}</span>
                <span className="desc">{product?.desc}</span>
              </>
            ) : (
              <span>Loading product...</span>
            )}

            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span onClick={decrement}>-</span>
                <span>{quantity}</span>
                <span onClick={increment}>+</span>
              </div>
              <button
                className="add-to-cart-button"
                onClick={() => {
                  handleAddToCart(data.data[0], quantity);
                  setQuantity(1);
                }}
              >
                <FaCartPlus size={20} />
                ADD TO CART
              </button>
            </div>

            <span className="divider" />

            <div className="info-item">
              <span className="text-bold">
                Category:
                {product?.categories &&
                product?.categories.data &&
                product?.categories.data.length > 0 ? (
                  <span
                    onClick={() =>
                      handleCategoryClick(product.categories.data[0].id)
                    }
                  >
                    {" "}
                    <span>{product.categories.data[0].attributes.title}</span>
                  </span>
                ) : (
                  <span> No category available</span>
                )}
              </span>

              <span className="text-bold">
                Share:
                <span className="social-icons">
                  <FaFacebookF size={16} />
                  <FaTwitter size={16} />
                  <FaInstagram size={16} />
                  <FaLinkedinIn size={16} />
                  <FaPinterest size={16} />
                </span>
              </span>
            </div>
          </div>
        </div>
        <RelatedProducts
          productId={id}
          categoryId={product?.categories.data[0].id}
        />
      </div>
    </div>
  );
};

export default SingleProduct;
