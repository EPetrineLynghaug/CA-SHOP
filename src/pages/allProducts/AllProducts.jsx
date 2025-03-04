import { useState } from "react";
import { useProducts } from "../../hooks/productsApi";
import ProductList from "../../components/ProductList";

export default function AllProducts() {
  const { products, loading, error } = useProducts();
  const [visibleCount, setVisibleCount] = useState(12);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="bg-white mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>

      {loading && <p className="text-center text-gray-500">Loading products...</p>}
      {error && <p className="text-center text-red-500">Error: {error.message}</p>}

      <ProductList products={visibleProducts} />

      {visibleProducts.length < products.length && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisibleCount(visibleCount + 12)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition"
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
