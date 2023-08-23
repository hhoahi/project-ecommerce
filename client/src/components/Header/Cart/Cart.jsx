import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";

import CartItem from "./CartItem/CartItem";
import { useNavigate } from "react-router-dom";
import "./Cart.scss";
import { makePaymentRequest } from "../../../utils/api";
import { getUser } from "../../../utils/helpers";

import { loadStripe } from "@stripe/stripe-js";

const Cart = ({ setShowCart }) => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.attributes.price);
    return total + itemPrice * item.attributes.quantity;
  }, 0);

  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  const userProfile = getUser();
  const userId = userProfile?.id;

  const handlePayment = async () => {
    const userProfile = getUser();
    if (!userProfile) {
      history("/login");
      setShowCart(false);
      return;
    }
    try {
      const stripe = await stripePromise;
      const res = await makePaymentRequest.post("/api/orders", {
        products: cartItems,
        userId: userId,
        status: "Processing",
      });

      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const history = useNavigate();
  const handleClickReturn = () => {
    setShowCart(false);
    history("/");
  };

  return (
    <div className="cart-panel">
      <div className="opac-layer" onClick={() => handleClickReturn()}></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose />
            <span className="text">close</span>
          </span>
        </div>

        {!cartItems?.length && (
          <div className="empty-cart">
            <BsCartX />
            <span>No products in the cart.</span>
            <button onClick={() => handleClickReturn()} className="return-cta">
              RETURN TO SHOP
            </button>
          </div>
        )}

        {!!cartItems?.length && (
          <div>
            <CartItem />
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal:</span>
                <span className="text total">&#x24;{subtotal.toFixed(2)}</span>
              </div>
              <div className="button">
                <button className="checkout-cta" onClick={handlePayment}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
