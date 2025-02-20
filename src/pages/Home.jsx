import React from "react";
import AllProducts from "../components/AllProducts"; // ✅ Bruker AllProducts-komponenten

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6">Welcome to Our Store</h1>
      <AllProducts /> {/* ✅ Inkluderer produktvisningen */}
    </div>
  );
}
