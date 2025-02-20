import { BrowserRouter as Router, Routes, Route } from "react-router";
import React from "react";
import Home from "./pages/Home";
import SingleProduct from "./pages/singleProducts/SingleProduct";
import Layout from "./components/Layout";
import About from './pages/About';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* All routes are wrapped in the Layout component */}
        <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/products/:id" element={<SingleProduct />} /> {/* ✅ Dynamisk rute */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

