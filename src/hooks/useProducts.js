import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productsApi";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  return { products, loading };
}
