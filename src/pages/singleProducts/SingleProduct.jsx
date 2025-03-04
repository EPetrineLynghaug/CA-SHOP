import React, { useState } from "react";
import { useParams } from "react-router";
import { useProductById } from "../../hooks/productsApi";
import useProductStore from "../../store/productStore";


import { FaRegHeart, FaHeart, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

function StarRating({ initialRating = 0 }) {
  const [hoverIndex, setHoverIndex] = useState(0);
  const [rating, setRating] = useState(initialRating);

  const handleClick = (index) => {
    setRating(index);
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoverIndex || rating);
        return (
          <FaStar
            key={star}
            onMouseEnter={() => setHoverIndex(star)}
            onMouseLeave={() => setHoverIndex(0)}
            onClick={() => handleClick(star)}
            className={`w-5 h-5 cursor-pointer transition ${
              isFilled ? "text-yellow-500" : "text-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
}


function ImageCarousel({ images = [] }) {
  const [index, setIndex] = useState(0);

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
      {/* Hovedbilde */}
      <img
        src={currentImage.url}
        alt={currentImage.alt || "Product image"}
        className="w-full max-h-96 object-cover"
      />

      {/* Hvis flere bilder, vis piltaster */}
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

      {/* Indikator "1/2" nede til venstre */}
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
  const { addToCart } = useProductStore();

  // Hjerte-favorisering
  const [isFavorited, setIsFavorited] = useState(false);

  if (loading) {
    return <p className="text-center text-gray-500 text-lg">Loading product details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">{error.message}</p>;
  }

  if (!product || Object.keys(product).length === 0) {
    return <p className="text-center text-gray-500 text-lg">No product found.</p>;
  }

  // Sjekk om vi har flere bilder (product.images) eller bare ett (product.image)
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

  const toggleFavorite = () => {
    setIsFavorited((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Tilbake-knapp */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <button
          onClick={() => window.history.back()}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          &larr; Tilbake
        </button>
      </div>

      {/* Innholdscontainer */}
      <div className="max-w-2xl mx-auto px-4 pb-8">
        {/* Bilde + hjerte */}
        <div className="relative w-full mb-4">
          <ImageCarousel images={imagesArray} />

          {/* Hjerte-ikon øverst til høyre over bildet */}
          <div className="absolute top-2 right-2">
            <div
              className="bg-white p-2 rounded-full shadow-md cursor-pointer"
              onClick={toggleFavorite}
            >
              {isFavorited ? (
                <FaHeart
                  className="w-5 h-5 text-black animate-heartFill"
                  style={{
                    clipPath: "inset(0 0 0 0)",
                  }}
                />
              ) : (
                // Outline-hjerte for "ikke favorisert"
                <FaRegHeart className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>
        </div>

        {/* Tittel og stjerner på samme linje */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">
            {product.title || "TEKT"}
          </h1>

          {/* Viser stjerner kun hvis product.rating finnes */}
          {product.rating && (
            <StarRating initialRating={product.rating} />
          )}
        </div>

        {/* Pris */}
        <p className="text-gray-800 text-lg font-medium mb-4">
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

        {/* Kjøpsknapp */}
        <button
          onClick={handleAddToCart}
          className="bg-black text-white py-2 px-6 rounded-md hover:opacity-90 transition mb-6"
        >
          Legg i handlevogn
        </button>

        {/* Produktbeskrivelse */}
        <div className="border-t border-gray-200 pt-4 mb-6">
          <h2 className="uppercase text-sm font-semibold text-gray-700 mb-2">
            PRODUKT beskrivelse
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {product.description || "Ingen beskrivelse tilgjengelig."}
          </p>
        </div>

        {/* Anmeldelser */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="border-t border-gray-200 pt-4">
            <h2 className="uppercase text-sm font-semibold text-gray-700 mb-4">
              ANMELDELSER
            </h2>
            <ul className="space-y-4">
              {product.reviews.map((review) => (
                <li
                  key={review.id}
                  className="border-b border-gray-200 pb-4"
                >
                  {/* Hvis review.rating finnes, vis stjerner */}
                  {typeof review.rating === "number" && (
                    <div className="flex items-center mb-1">
                      <StarRating initialRating={review.rating} />
                      <span className="ml-2 text-sm text-gray-600">
                        {review.rating}/5
                      </span>
                    </div>
                  )}
                  <p className="text-sm text-gray-800 font-semibold">
                    {review.username}
                  </p>
                  <p className="text-sm text-gray-600">
                    {review.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
