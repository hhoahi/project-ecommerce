import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Categogy from "./components/Category/Category";
import Categories from "./pages/Categories";
import SingleProduct from "./pages/SingleProduct";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import AppContext from "./utils/context";
import Button from "./components/UI/Button";

function App() {
  return (
    <BrowserRouter>
      <AppContext>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about/" element={<About />} />
          <Route path="/categories/" element={<Categories />} />
          <Route path="/category/:id" element={<Categogy />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Routes>
        <Newsletter />
        <Footer />
        <Button />
      </AppContext>
    </BrowserRouter>
  );
}

export default App;
