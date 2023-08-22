import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditProfile from "./components/Profile/EditProfile/EditProfile";
import About from "./pages/About";
import Location from "./pages/Location";
import Categogy from "./components/Category/Category";
import Categories from "./pages/Categories";
import SingleProduct from "./pages/SingleProduct";

import Admin from "./admin/Admin";
import Users from "./admin/Users/Users";
import AddUsers from "./admin/Users/AddUsers/AddUsers";
import EditUsers from "./admin/Users/EditUsers/EditUsers";
import ViewProducts from "./admin/Products/ViewProducts/ViewProducts";
import AddProducts from "./admin/Products/AddProducts/AddProducts";
import EditProducts from "./admin/Products/EditProducts/EditProducts";
import ViewCategories from "./admin/Categories/ViewCategories/ViewCategories";
import AddCategories from "./admin/Categories/AddCategories/AddCategories";
import EditCategories from "./admin/Categories/EditCategories/EditCategories";

import AppContext from "./utils/context";
import Layout from "./pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <AppContext>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/myprofile" element={<EditProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/location" element={<Location />} />
            <Route path="/category/" element={<Categories />} />
            <Route path="/category/:id" element={<Categogy />} />
            <Route path="/product/:id" element={<SingleProduct />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="/users/" element={<Users />} />
          <Route path="/api/users" element={<AddUsers />} />
          <Route path="/api/users/:id" element={<EditUsers />} />
          <Route path="/products/" element={<ViewProducts />} />
          <Route path="/api/products" element={<AddProducts />} />
          <Route path="/api/products/:id" element={<EditProducts />} />
          <Route path="/categories/" element={<ViewCategories />} />
          <Route path="/api/categories" element={<AddCategories />} />
          <Route path="/api/categories/:id" element={<EditCategories />} />
        </Routes>
      </AppContext>
    </BrowserRouter>
  );
}

export default App;
