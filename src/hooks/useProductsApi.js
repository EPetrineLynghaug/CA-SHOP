import { useState, useEffect } from "react";

const BASE_URL = "https://v2.api.noroff.dev/online-shop/";

// Custom hook for å hente alle produkter
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true; // brukes for å unngå state-updates etter unmount

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            errorText || `API request failed med status ${response.status}`
          );
        }
        // Hent respons som tekst, og parser dersom den ikke er tom
        const text = await response.text();
        const result = text ? JSON.parse(text) : {};
        if (isMounted) {
          setProducts(result.data || []);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Feil ved henting av produkter:", err);
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return { products, error, loading };
}

// Custom hook for å hente et enkelt produkt basert på ID
// Gjenbruker listen fra useProducts og filtrerer ut ønsket produkt
export function useProductById(id) {
  const { products, error, loading } = useProducts();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products.length > 0) {
      const found = products.find((p) => p.id === id);
      setProduct(found || null);
    }
  }, [id, products]);

  return { product, error, loading };
}

export default { useProducts, useProductById };
