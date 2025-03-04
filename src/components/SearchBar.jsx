// export default function SearchBar({ searchQuery, setSearchQuery }) {
//     return (
//       <div className="mb-8">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
//         />
//       </div>
//     );
//   }
  
import React from "react";
import { useLocation } from "react-router-dom";
import { useProducts } from "../hooks/productsApi";
import ProductList from "../components/ProductList";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Home() {
  const { products, loading, error } = useProducts();
  const query = useQuery();
  const searchTerm = query.get("q") || "";

  // Filtrer produkter basert på søket (eksempel med case-insensitive match)
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {loading && <p>Loading products...</p>}
      {error && <p>Error: {error.message}</p>}
      <h1 className="text-2xl font-bold mb-4">
        {searchTerm ? `Søkeresultater for "${searchTerm}"` : "Alle produkter"}
      </h1>
      <ProductList products={searchTerm ? filteredProducts : products} />
    </div>
  );
}



