import { useEffect } from "react";
import { createContext, useState } from "react";
import { getToken } from "./helpers";
import { useLocation, useNavigate } from "react-router-dom";
import Strapi from "strapi-sdk-js";
import { getCurrentUser } from "./api";

export const Context = createContext();
const jwt = getToken();
const apiUrl = process.env.REACT_APP_STRIPE_APP_DEV_UR;
const strapi = new Strapi(apiUrl);

const AppContext = ({ children }) => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const [productAdmin, setProductAdmin] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user.id;

  //cuộn đến đầu trang mỗi khi location thay đổi
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  //tính toán tổng sản phẩm trong giỏ hàng
  const calculateTotals = () => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    let count = 0;
    let subTotal = 0;

    storedCartItems.forEach((item) => {
      count += item.attributes.quantity;
      subTotal += item.attributes.price * item.attributes.quantity;
    });

    setCartCount(count);
    setCartSubTotal(subTotal);
  };

  //tính toán lại số lượng hàng và tổng giá trị của giỏ hàng mỗi khi danh sách giỏ hàng thay đổi
  useEffect(() => {
    calculateTotals();
  }, [cartItems]);

  //thực hiện các thao tác thêm, xóa và thay đổi số lượng sản phẩm trong giỏ hàng
  const handleAddToCart = (product, quantity) => {
    let items = JSON.parse(localStorage.getItem("cartItems")) || [];
    let index = items.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      items[index].attributes.quantity += quantity;
    } else {
      product.attributes.quantity = quantity;
      items.push(product);
    }

    localStorage.setItem("cartItems", JSON.stringify(items));
    setCartItems(items);
    calculateTotals();
  };

  const handleRemoveFromCart = (product) => {
    const updatedItems = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const handleCartProductQuantity = (type, product) => {
    const updatedItems = [...cartItems];
    const index = updatedItems.findIndex((item) => item.id === product.id);
    if (type === "inc") {
      updatedItems[index].attributes.quantity += 1;
    } else if (type === "dec") {
      if (updatedItems[index].attributes.quantity === 1) return;
      updatedItems[index].attributes.quantity -= 1;
    }
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  //điều hướng khi navigate thay đổi, đoạn mã bên trong useEffect sẽ được thực thi

  return (
    //Context Provider thành phần chính để cung cấp Context cho toàn bộ ứng dụng.
    //Các giá trị và hàm được đặt trong Context.Provider để có thể truy cập từ bất kỳ thành phần con nào trong ứng dụng
    <Context.Provider
      value={{
        categories,
        setCategories,
        products,
        setProducts,
        cartItems,
        setCartItems,
        cartCount,
        setCartCount,
        cartSubTotal,
        setCartSubTotal,
        handleAddToCart,
        handleRemoveFromCart,
        handleCartProductQuantity,
        userData,
        setUserData,
        isOpen,
        setIsOpen,
        productAdmin,
        setProductAdmin,
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
