import React, { useState } from "react";
import { useLocation } from "react-router";
import { useProducts } from "../../hooks/useProductsApi";
import ProductList from "../../components/product/ProductList";
import Spinner from "../../components/Spinner";

export default function AllProducts() {
  const { products, loading, error } = useProducts();
  const [visibleCount, setVisibleCount] = useState(12);

  // Get the query parameter from the URL
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("q") || "";

  // Sort so that sale items appear first
  const sortedProducts = [...products].sort((a, b) => {
    const aOnSale = a.discountedPrice && a.discountedPrice < a.price;
    const bOnSale = b.discountedPrice && b.discountedPrice < b.price;
    if (aOnSale && !bOnSale) return -1;
    if (!aOnSale && bOnSale) return 1;
    return 0;
  });

  // Filter products if a query parameter exists
  const filteredProducts = queryParam
    ? sortedProducts.filter((product) =>
        product.title.toLowerCase().includes(queryParam.toLowerCase())
      )
    : sortedProducts;

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="bg-white mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-left mb-8">
        {queryParam ? `Results for "${queryParam}"` : "Explore Our Collection"}
      </h1>

      {loading && <Spinner />}
      {error && <p className="text-center text-red-500">Error: {error.message}</p>}

      <ProductList products={visibleProducts} />

      {visibleProducts.length < filteredProducts.length && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisibleCount(visibleCount + 12)}
            className="px-6 py-3 rounded-md shadow bg-black text-white hover:bg-gray-800"
          >
            Load More
          </button>
        </div>
      )}

      {!loading && visibleProducts.length === 0 && (
        <p className="mt-8 text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
}
