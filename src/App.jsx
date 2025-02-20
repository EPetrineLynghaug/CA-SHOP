import { BrowserRouter as Router, Routes, Route } from "react-router";
import React from "react";
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<SingleProduct />} /> {/* ✅ Dynamisk rute */}
      </Routes>
    </Router>
  );
}

export default App;
