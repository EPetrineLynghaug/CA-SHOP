import React from "react";
import { Link } from "react-router";
import ProductList from "../components/ProductList";
import useProductStore from "../store/productStore";

export default function Favorites() {
  const { favourites } = useProductStore();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
      {favourites.length > 0 ? (
        <ProductList products={favourites} />
      ) : (
        <p>No favorites yet.</p>
      )}
      <div className="mt-6">
        <Link to="/cart">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md">
            Go to Cart
          </button>
        </Link>
      </div>
    </div>
  );
}
