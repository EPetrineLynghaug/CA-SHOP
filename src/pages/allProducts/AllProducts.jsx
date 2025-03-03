// import { useState } from "react";
// import useProducts from "../../hooks/useProducts";
// import ProductList from "../../components/ProductList";
// import SearchBar from "../../components/SearchBar";

// export default function AllProducts() {
//   const { products, loading } = useProducts();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [visibleCount, setVisibleCount] = useState(12);

//   const filteredProducts = products.filter((product) =>
//     product.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const visibleProducts = filteredProducts.slice(0, visibleCount);

//   return (
//     <div className="bg-white mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//       <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

//       {loading && <p>Loading products...</p>}

//       <ProductList products={visibleProducts} />

//       {visibleProducts.length < filteredProducts.length && (
//         <div className="mt-8 flex justify-center">
//           <button
//             onClick={() => setVisibleCount(visibleCount + 12)}
//             className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition"
//           >
//             Load More
//           </button>
//         </div>
//       )}

//       {!loading && visibleProducts.length === 0 && (
//         <p className="mt-8 text-center text-gray-500">No products found.</p>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import { useProducts } from "../../hooks/productsApi";
import ProductList from "../../components/ProductList";
import SearchBar from "../../components/SearchBar";

export default function AllProducts() {
  const { products, loading } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="bg-white mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {loading && <p>Loading products...</p>}

      <ProductList products={visibleProducts} />

      {visibleProducts.length < filteredProducts.length && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisibleCount(visibleCount + 12)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition"
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
