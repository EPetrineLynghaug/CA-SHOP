import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);

      try {

        const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
        if (!response.ok) {
          throw new Error("Noe gikk galt ved henting av produktdata.");
        }

        const json = await response.json();
        setProduct(json.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>No product found.</p>;
  }

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      {product.image && (
        <img
          src={product.image.url}
          alt={product.image.alt}
          className="w-full max-h-96 object-cover mb-4 rounded"
        />
      )}
      
      {/* Prisvisning (med evt. rabatt) */}
      {product.discountedPrice < product.price ? (
        <div className="text-lg font-semibold mb-2">
          <p className="text-green-600">Discounted Price: ${product.discountedPrice}</p>
          <p className="line-through text-gray-500">Original: ${product.price}</p>
        </div>
      ) : (
        <p className="text-lg font-semibold mb-2">Price: ${product.price}</p>
      )}

      {/* Viser rating dersom den finnes */}
      {product.rating && (
        <p className="text-yellow-500 mb-2">Rating: {product.rating} / 5</p>
      )}

      {/* Beskrivelse */}
      <p className="mb-4">{product.description}</p>

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="mb-4">
          <span className="font-bold mr-2">Tags:</span>
          {product.tags.map((tag, index) => (
            <span key={index} className="inline-block bg-gray-200 text-gray-800 rounded px-2 py-1 mr-2 text-sm">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Reviews</h2>
          <ul className="space-y-4">
            {product.reviews.map((review) => (
              <li key={review.id} className="border-b pb-2">
                <p className="font-semibold">{review.username}</p>
                <p>Rating: {review.rating} / 5</p>
                <p>{review.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
