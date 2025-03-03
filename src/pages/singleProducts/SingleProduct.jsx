import { useParams } from "react-router";
import { useProductById } from "../../hooks/productsApi";

export default function SingleProduct() {
  const { id } = useParams();
  const { product, loading, error } = useProductById(id);

  if (loading) {
    return <p className="text-center text-gray-500 text-lg">Loading product details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">{error.message}</p>;
  }

  if (!product || Object.keys(product).length === 0) {
    return <p className="text-center text-gray-500 text-lg">No product found.</p>;
  }

  return (
    <div className="mx-auto max-w-2xl p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 text-center">{product.title}</h1>

      {product.image && product.image.url ? (
        <img
          src={product.image.url}
          alt={product.image.alt || "Product image"}
          className="w-full max-h-96 object-cover rounded-lg mb-6"
        />
      ) : (
        <p className="text-center text-gray-500">No image available</p>
      )}

      <div className="text-lg font-semibold mb-4 text-center">
        {product.discountedPrice < product.price ? (
          <>
            <p className="text-green-600 text-2xl font-bold">Discounted Price: ${product.discountedPrice}</p>
            <p className="line-through text-gray-500">Original: ${product.price}</p>
          </>
        ) : (
          <p className="text-gray-900 text-2xl font-bold">Price: ${product.price}</p>
        )}
      </div>

      {product.rating && (
        <p className="text-yellow-500 text-center text-lg mb-4">⭐ Rating: {product.rating} / 5</p>
      )}

      <p className="text-gray-700 mb-6 text-center">{product.description}</p>

      {product.tags && product.tags.length > 0 && (
        <div className="mb-6 text-center">
          <span className="font-bold text-gray-800">Tags:</span>
          {product.tags.map((tag, index) => (
            <span key={index} className="inline-block bg-gray-200 text-gray-800 rounded px-2 py-1 mx-1 text-sm">
              {tag}
            </span>
          ))}
        </div>
      )}

      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-center mb-4">Reviews</h2>
          <ul className="space-y-4">
            {product.reviews.map((review) => (
              <li key={review.id} className="border-b pb-4 px-4">
                <p className="font-semibold">{review.username}</p>
                <p className="text-yellow-500">⭐ {review.rating} / 5</p>
                <p className="text-gray-700">{review.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
