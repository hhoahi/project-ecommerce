import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Location from "./pages/Location";
import Categogy from "./components/Category/Category";
import Categories from "./pages/Categories";
import SingleProduct from "./pages/SingleProduct";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import AppContext from "./utils/context";
import Button from "./components/UI/Button";
import ProductList from "./Admin/AdminProduct/ProductList";
import Create from "./Admin/AdminProduct/Create";
import Edit from "./Admin/AdminProduct/Edit";
import CategoryList from "./Admin/AdminCategory/CategoryList";
import CreateProduct from "./Admin/AdminProduct/CreateProduct";

function App() {
  return (
    <BrowserRouter>
      <AppContext>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about/" element={<About />} />
          <Route path="/location" element={<Location />} />
          <Route path="/categories/" element={<Categories />} />
          <Route path="/category/:id" element={<Categogy />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/api/products" element={<Create />} />
          <Route path="/api/products/:id" element={<Edit />} />
          <Route path="/admin/category" element={<CategoryList />} />
          <Route path="/create" element={<CreateProduct />} />
        </Routes>
        <Newsletter />
        <Footer />
        <Button />
      </AppContext>
    </BrowserRouter>
  );
}

export default App;
