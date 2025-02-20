import { useEffect, useState } from "react";
import { fetchProductById } from "../api/productsApi";

export default function useSingleProduct(productId) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    async function loadProduct() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  return { product, loading, error };
}
