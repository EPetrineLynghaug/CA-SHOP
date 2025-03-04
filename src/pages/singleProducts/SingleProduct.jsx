import React from "react";
import { useParams } from "react-router";
import { useProductById } from "../../hooks/productsApi";
import useProductStore from "../../store/productStore";
import { 
  FaRegHeart, 
  FaHeart, 
  FaStar, 
  FaChevronLeft, 
  FaChevronRight, 
  FaChevronDown 
} from "react-icons/fa";

// Statisk stjernerating: viser 5 stjerner basert på "rating"-prop, ingen interaksjon
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

function ImageCarousel({ images = [] }) {
  const [index, setIndex] = React.useState(0);

  if (!images.length) {
    return <p className="text-center text-gray-500">No image available</p>;
  }

  const currentImage = images[index];

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full">
      <img
        src={currentImage.url}
        alt={currentImage.alt || "Product image"}
        className="w-full max-h-96 object-cover"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white p-2 rounded-full shadow text-gray-600 hover:text-black"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white p-2 rounded-full shadow text-gray-600 hover:text-black"
          >
            <FaChevronRight />
          </button>
        </>
      )}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {index + 1}/{images.length}
        </div>
      )}
    </div>
  );
}

export default function SingleProduct() {
  const { id } = useParams();
  const { product, loading, error } = useProductById(id);
  const { addToCart, favourites, addFavourite, removeFavourite } = useProductStore();
  const [showReviews, setShowReviews] = React.useState(false);

  if (loading) {
    return <p className="text-center text-gray-500 text-lg">Loading product details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">{error.message}</p>;
  }

  if (!product || Object.keys(product).length === 0) {
    return <p className="text-center text-gray-500 text-lg">No product found.</p>;
  }

  // Samle bilder: Bruker product.images hvis det finnes, ellers product.image
  let imagesArray = [];
  if (Array.isArray(product.images) && product.images.length > 0) {
    imagesArray = product.images;
  } else if (product.image && product.image.url) {
    imagesArray = [product.image];
  }

  const handleAddToCart = () => {
    addToCart(product);
    console.log("Product added to cart:", product);
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
      {/* Back-knapp */}
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        <button
          onClick={() => window.history.back()}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          &larr; Back
        </button>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 pb-8">
        {/* Gridoppsett: én kolonne på mobil, to kolonner på tablet og desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Venstre kolonne: Bildeslider */}
          <div className="relative">
            <ImageCarousel images={imagesArray} />
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
              className="bg-black text-white py-3 px-8 rounded-md hover:opacity-90 transition"
            >
              Add to Cart
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

            {/* Reviews med tydelig toggle og forbedret layout */}
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
