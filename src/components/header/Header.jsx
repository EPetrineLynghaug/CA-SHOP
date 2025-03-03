import { Link } from 'react-router';
import { FaShoppingCart } from "react-icons/fa";
import useProductStore from "../../store/productStore"; // Juster banen om nødvendig

const Header = () => {
  const { cart } = useProductStore();
  // Beregn totalt antall varer (summerer alle quantity)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">My Store</Link>
        <ul className="flex items-center gap-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
          <li>
            <Link to="/cart" className="relative">
              <FaShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
