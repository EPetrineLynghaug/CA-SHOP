import { BrowserRouter as Router, Routes, Route } from "react-router";
import React from "react";
import Home from "./pages/Home";
import SingleProduct from "./pages/singleProducts/SingleProduct";
import Layout from "./components/Layout";
import Contact from './pages/Contact';
import Favorites from "./pages/Favorites";

import Cart from "./pages/cart/Cart";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* All routes are wrapped in the Layout component */}
        <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/products/:id" element={<SingleProduct />} /> {/* ✅ Dynamisk rute */}
        <Route path="favorites" element={<Favorites />} />
        <Route path="cart" element={<Cart />} />
       
        </Route>
      </Routes>
    </Router>
  );
};

export default App;




