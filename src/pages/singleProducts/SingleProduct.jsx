import React from "react";
import { useParams, Link } from "react-router";
import { useProductById } from "../../hooks/useProductsApi";
import useProductStore from "../../store/productStore";
import { FaRegHeart, FaHeart, FaStar, FaChevronDown } from "react-icons/fa";
import Spinner from "../../components/Spinner";

// Statisk stjernerating
function StarRating({ rating = 0 }) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function SingleProduct() {
  const { id } = useParams();
  const { product, loading, error } = useProductById(id);
  const { addToCart, favourites, addFavourite, removeFavourite } = useProductStore();
  const [showReviews, setShowReviews] = React.useState(false);
  const [addedToCart, setAddedToCart] = React.useState(false);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">{error.message}</p>;
  }

  if (!product || Object.keys(product).length === 0) {
    return <p className="text-center text-gray-500 text-lg">No product found.</p>;
  }

  // Bruker produktets enkeltbilde
  const productImage = product.image && product.image.url ? product.image : null;

  const handleAddToCart = () => {
    addToCart(product);
    console.log("Product added to cart:", product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const isFavorited = favourites.some((fav) => fav.id === product.id);
  const toggleFavorite = () => {
    if (isFavorited) {
      removeFavourite(product.id);
    } else {
      addFavourite(product);
    }
  };

  return (
    <div className="min-h-screen bg-white">
    
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 text-sm border-gray-300 rounded-md transition-colors duration-200  hover:text-gray-900"
        >
          <span>&larr;</span>
          <span>Back</span>
        </Link>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Venstre kolonne: Produktbilde */}
          <div className="relative">
            {productImage ? (
              <img
                src={productImage.url}
                alt={productImage.alt || "Product image"}
                className="w-full max-h-96 object-cover"
              />
            ) : (
              <p className="text-center text-gray-500">No image available</p>
            )}
            <div className="absolute top-4 right-4">
              <div
                className="bg-white p-2 rounded-full shadow-md cursor-pointer"
                onClick={toggleFavorite}
              >
                {isFavorited ? (
                  <FaHeart className="w-6 h-6 text-black animate-heartFill" />
                ) : (
                  <FaRegHeart className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </div>
          </div>

          {/* Høyre kolonne: Produktdetaljer */}
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.title || "No Title"}
              </h1>
              <div className="mt-2">
                <StarRating rating={product.rating || 0} />
              </div>
            </div>
            
            {/* Pris */}
            <div>
              <p className="text-gray-800 text-2xl font-medium">
                {product.discountedPrice < product.price ? (
                  <>
                    <span className="text-green-600 font-bold">
                      ${product.discountedPrice}
                    </span>
                    <span className="ml-2 line-through text-gray-500">
                      ${product.price}
                    </span>
                  </>
                ) : (
                  <span className="font-semibold">${product.price}</span>
                )}
              </p>
            </div>

            {/* Legg i handlekurv-knapp */}
            <button
              onClick={handleAddToCart}
              className={`py-3 px-8 rounded-md transition-colors duration-200 ${
                addedToCart 
                  ? "bg-green-600 text-white" 
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {addedToCart ? "Added to Cart" : "Add to Cart"}
            </button>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div>
                <h2 className="uppercase text-sm font-semibold text-gray-700 mb-2">
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Produktbeskrivelse */}
            <div className="border-t border-gray-200 pt-4">
              <h2 className="uppercase text-sm font-semibold text-gray-700 mb-2">
                Product Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Reviews med toggle */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setShowReviews(!showReviews)}
                >
                  <h2 className="uppercase text-sm font-semibold text-gray-700 mb-4">
                    Reviews
                  </h2>
                  <div className="flex items-center space-x-1 text-blue-500">
                    <span className="text-sm">
                      {showReviews ? "Hide Reviews" : "Show Reviews"}
                    </span>
                    <FaChevronDown
                      className={`transition-transform duration-300 ${
                        showReviews ? "transform rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
                {showReviews && (
                  <ul className="space-y-4">
                    {product.reviews.map((review) => (
                      <li key={review.id} className="border-b border-gray-200 pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <StarRating rating={review.rating} />
                            <span className="ml-2 text-sm text-gray-600">
                              {review.rating}/5
                            </span>
                          </div>
                          <p className="text-sm text-gray-800 font-semibold">
                            {review.username}
                          </p>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          {review.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
