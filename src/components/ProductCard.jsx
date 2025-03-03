// import { Link } from "react-router";

// export default function ProductCard({ product }) {
//   return (
//     <li className="bg-white rounded-lg p-4 text-center transition-shadow hover:shadow-lg">
//       <Link to={`/products/${product.id}`}>
//         <img
//           src={product.image.url}
//           alt={product.title}
//           className="w-full h-48 object-cover rounded-md mb-4"
//         />
//         <h2 className="text-lg font-medium text-gray-900">{product.title}</h2>
//         <p className="text-gray-500 mt-2">${product.price}</p>
//       </Link>
//     </li>
//   );
// }

// import { Link } from "react-router";


// function ProductCard({ product }) {
//   const { id, image, title, price } = product;

//   return (
//     <li className="bg-white rounded-lg p-4 text-center transition-shadow hover:shadow-lg">
//       <Link to={`/products/${id}`}>
//         {image && image.url && (
//           <img
//             src={image.url}
//             alt={title}
//             className="w-full h-48 object-cover rounded-md mb-4"
//           />
//         )}
//         <h2 className="text-lg font-medium text-gray-900">{title}</h2>
//         <p className="text-gray-500 mt-2">${price}</p>
//       </Link>
//     </li>
//   );
// }

// export default ProductCard;

import { Link } from "react-router";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useProductStore from "../store/productStore";


function ProductCard({ product }) {
  const { favourites, addFavourite, removeFavourite } = useProductStore();
  const isFavourite = favourites.some((fav) => fav.id === product.id);

  const toggleFavourite = (e) => {
    e.preventDefault(); // Hindrer at lenken trigges
    if (isFavourite) {
      removeFavourite(product.id);
    } else {
      addFavourite(product);
    }
  };

  const { id, image, title, price } = product;

  return (
    <li className="relative bg-white rounded-lg p-4 text-center transition-shadow hover:shadow-lg">
      <Link to={`/products/${id}`}>
        {image && image.url && (
          <img
            src={image.url}
            alt={title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        )}
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        <p className="text-gray-500 mt-2">${price}</p>
      </Link>
      <button
        onClick={toggleFavourite}
        className="absolute top-2 right-2 text-red-500 text-xl"
      >
        {isFavourite ? <FaHeart /> : <FaRegHeart />}
      </button>
    </li>
  );
}

export default ProductCard;
