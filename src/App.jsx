import { BrowserRouter as Router, Routes, Route } from "react-router";
import React from "react";
import Home from "./pages/Home";
import AllProducts from "./api/AllProducts";
import SingleProduct from "./api/SingleProduct";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/AllProducts" element={<AllProducts />} />
        <Route path="/products/:id" element={<SingleProduct />} />
       
       
      </Routes>
    </Router>
  );
}

export default App;
