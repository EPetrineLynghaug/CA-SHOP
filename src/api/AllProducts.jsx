import { useEffect, useState } from "react";
import { Link } from "react-router"; 

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const response = await fetch("https://v2.api.noroff.dev/online-shop/");
        const apidata = await response.json();
        // API-et returnerer et objekt med en "data"-nøkkel som inneholder en array med produkter
        // const productsArray = Array.isArray(data.data) ? data.data : [];

        setProducts(apidata.data);
      
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Filtrer produktene basert på søket
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Beregn hvilke produkter som skal vises basert på visibleCount
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="bg-white mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        Our Products
      </h1>

      {/* Søkeinput */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
      </div>

      {loading && <p>Loading products...</p>}

      {/* Produktliste som ul med Tailwind-klasser */}
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleProducts.map((product) => (
          <li
            key={product.id}
            className="bg-white  rounded-lg p-4 text-center transition-shadow hover:shadow-lg"
          >
            <Link to={`/products/${product.id}`}>
              <img
                src={product.image.url}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-medium text-gray-900">
                {product.title}
              </h2>
              <p className="text-gray-500 mt-2">${product.price}</p>
            </Link>
          </li>
        ))}
      </ul>

      {/* Load More-knapp */}
      {visibleProducts.length < filteredProducts.length && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisibleCount(visibleCount + 12)}
            className="px-4 py-2 bg-indigo-600 text-black rounded-md shadow hover:bg-indigo-700 transition"
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
