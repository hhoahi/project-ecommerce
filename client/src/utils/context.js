import { useEffect } from "react";
import { createContext, useState } from "react";
import { getToken } from "./helpers";
import { useLocation, useNavigate } from "react-router-dom";
import Strapi from "strapi-sdk-js";

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

  //tính toán tổng giỏ hàng
  const calculateTotals = () => {
    let count = 0;
    let subTotal = 0;

    cartItems.forEach((item) => {
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
    // Lấy danh sách sản phẩm trong giỏ hàng từ localStorage (nếu có)
    let items = JSON.parse(localStorage.getItem("cartItems")) || [];
    let index = items.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      // Cập nhật số lượng sản phẩm nếu đã tồn tại
      items[index].attributes.quantity += quantity;
    } else {
      // Thêm sản phẩm mới vào danh sách
      product.attributes.quantity = quantity;
      items.push(product);
    }
    // Cập nhật danh sách sản phẩm trong localStorage
    localStorage.setItem("cartItems", JSON.stringify(items));
    // Cập nhật state (nếu bạn đang sử dụng React hoặc framework tương tự)
    setCartItems(items);
    calculateTotals();
  };

  const handleRemoveFromCart = (product) => {
    let items = [...cartItems];
    items = items.filter((p) => p.id !== product.id);
    setCartItems(items);
  };

  const handleCartProductQuantity = (type, product) => {
    let items = [...cartItems];
    let index = items.findIndex((p) => p.id === product.id);
    if (type === "inc") {
      items[index].attributes.quantity += 1;
    } else if (type === "dec") {
      if (items[index].attributes.quantity === 1) return;
      items[index].attributes.quantity -= 1;
    }
    setCartItems(items);
  };

  //điều hướng khi navigate thay đổi, đoạn mã bên trong useEffect sẽ được thực thi.
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("user"))?.user.username;
    //kiểm tra vai trò của người dùng có khác "admin" và đồng thời địa chỉ URL hiện tại có phải "/admin" không
    if (role !== "admin" && window.location.pathname === "/admin") {
      navigate("/");
      console.log(true);
    }
  }, [navigate]);

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
