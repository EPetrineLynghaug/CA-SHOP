import { useState, useEffect } from "react";

const BASE_URL = "https://v2.api.noroff.dev/online-shop/";

// Custom hook for å hente alle produkter
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
          throw new Error(`Nettverksfeil: ${response.status}`);
        }
        const apidata = await response.json();
        setProducts(apidata.data);
      } catch (err) {
        console.error("Feil ved henting av produkter:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}

// Custom hook for å hente et produkt basert på ID
export function useProductById(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchProductById = async () => {
      console.log(`🔍 Henter produkt med ID:`, id);
      try {
        const response = await fetch(`${BASE_URL}${id}`);
        console.log(`🔍 API responsstatus:`, response.status);
        if (!response.ok) {
          throw new Error(
            `❌ API-feil: ${response.status} ${response.statusText}`
          );
        }
        const apidata = await response.json();
        console.log(`🔍 API respons JSON:`, apidata);
        setProduct(apidata.data);
      } catch (err) {
        console.error(`❌ Feil ved henting av produkt med ID ${id}:`, err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductById();
  }, [id]);

  return { product, loading, error };
}

export default { useProducts, useProductById };