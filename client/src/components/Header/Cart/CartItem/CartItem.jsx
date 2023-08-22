import { useContext } from "react";
import { MdClose } from "react-icons/md";
import "./CartItem.scss";
import { Context } from "../../../../utils/context";

const stripeAppDevUrl = process.env.REACT_APP_STRIPE_APP_DEV_URL;

const CartItem = () => {
  const {handleRemoveFromCart, handleCartProductQuantity } =
    useContext(Context);
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    console.log(cartItems)
  return (
    <div className="cart-products">
      {cartItems.map((item) => (
        <div key={item.id} className="cart-product">
          <div className="img-container">
            {item.attributes.img &&
              item.attributes.img.data &&
              item.attributes.img.data[0] && (
                <img
                  src={
                    stripeAppDevUrl + item.attributes.img.data[0].attributes.url
                  }
                  alt=""
                />
              )}
          </div>
          <div className="prod-details">
            <span className="name">{item.attributes.title}</span>
            <MdClose
              className="close-btn"
              onClick={() => handleRemoveFromCart(item)}
            />

            <div className="quantity-buttons">
              <span onClick={() => handleCartProductQuantity("dec", item)}>
                -
              </span>
              <span>{item.attributes.quantity}</span>
              <span onClick={() => handleCartProductQuantity("inc", item)}>
                +
              </span>
            </div>

            <div className="text">
              <span className="highlight">
                &#x24;{item.attributes.price * item.attributes.quantity}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
