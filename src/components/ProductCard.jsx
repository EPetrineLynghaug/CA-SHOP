import { Link } from "react-router";

export default function ProductCard({ product }) {
  return (
    <li className="bg-white rounded-lg p-4 text-center transition-shadow hover:shadow-lg">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image.url}
          alt={product.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-lg font-medium text-gray-900">{product.title}</h2>
        <p className="text-gray-500 mt-2">${product.price}</p>
      </Link>
    </li>
  );
}
