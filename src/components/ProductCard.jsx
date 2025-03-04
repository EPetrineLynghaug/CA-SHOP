import React, { useState } from "react";
import { Link } from "react-router"; 
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useProductStore from "../store/productStore";

function ProductCard({ product }) {
  const { favourites, addFavourite, removeFavourite } = useProductStore();
  const isFavourite = favourites.some((fav) => fav.id === product.id);
  const [isFavLocal, setIsFavLocal] = useState(isFavourite);

  const toggleFavourite = (e) => {
    e.preventDefault(); // Hindrer at lenken trigges
    if (isFavourite) {
      removeFavourite(product.id);
      setIsFavLocal(false);
    } else {
      addFavourite(product);
      setIsFavLocal(true);
    }
  };

  const { id, image, title, price, discountedPrice } = product;
  const isOnSale = discountedPrice && discountedPrice < price;

  return (
    <li className="relative bg-white rounded-lg overflow-hidden shadow transition-shadow hover:shadow-2xl">
      <Link to={`/products/${id}`}>
        <div className="relative">
          {image && image.url ? (
            <img
              src={image.url}
              alt={title}
              className="w-full h-72 object-cover"
            />
          ) : (
            <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No image available</p>
            </div>
          )}
          {isOnSale && (
            <div className="absolute top-3 left-3 bg-[#4C5578] text-white text-xs font-bold px-2 py-1 rounded">
              SALE
            </div>
          )}
        </div>
      </Link>
      <div className="p-4 flex items-center justify-between">
        <Link to={`/products/${id}`}>
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </Link>
        <div className="text-lg font-semibold text-gray-700">
          {isOnSale ? (
            <>
              <span className="text-[#4C5578]">${discountedPrice}</span>
              <span className="ml-2 line-through text-gray-500">${price}</span>
            </>
          ) : (
            <span>${price}</span>
          )}
        </div>
      </div>
      {/* Hjerte-ikonet */}
      <button
        onClick={toggleFavourite}
        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md cursor-pointer transform transition-transform active:scale-110"
        aria-label="Toggle favorite"
      >
        {isFavLocal ? (
          <FaHeart
            className="w-6 h-6 text-black animate-heartFill"
            style={{ clipPath: "inset(0 0 0 0)" }}
          />
        ) : (
          <FaRegHeart className="w-6 h-6 text-gray-400" />
        )}
      </button>
    </li>
  );
}

export default ProductCard;
