
import React, { useState } from "react";
import { Link } from "react-router";
import { FaBars, FaTimes, FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import useProductStore from "../../store/productStore"; 
export default function Header() {
  const { cart, favourites } = useProductStore();

  // Summerer antall varer i handlekurven
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  // Antall favoritter
  const totalFavourites = favourites.length;

  // State for å åpne/lukke mobilmenyen
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="border-b">
      {/* Øverste stripe: "Always free shipping" */}
      <div className="bg-neutral-200 text-center py-2 text-sm">
        <p>Always free shipping</p>
      </div>

      {/* Hoved-nav */}
      <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        {/* Venstre side: Hamburgermeny + søkefelt */}
        <div className="flex items-center gap-2 w-full">
          {/* Hamburger-ikon (kun for mobil) */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-black transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {/* Søkefelt: Alltid synlig (du kan gjøre den skjult på større skjermer om ønskelig) */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Høyre side: Favoritter + handlekurv */}
        <div className="flex items-center gap-4 ml-4">
      
          <Link to="/favorites" className="relative">
            {totalFavourites > 0 ? (
              <FaHeart
                size={24}
                className="transition-transform duration-300 ease-in-out text-black hover:scale-110"
              />
            ) : (
              <FaRegHeart
                size={24}
                className="transition-transform duration-300 ease-in-out text-gray-500 hover:scale-110"
              />
            )}
          </Link>

          {/* Handlekurv med antall */}
          <Link to="/cart" className="relative">
            <FaShoppingCart
              size={24}
              className="transition-transform duration-300 ease-in-out text-gray-700 hover:scale-110"
            />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Mobilmeny: Vis lenker hvis menuOpen = true */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="p-4 space-y-2">
            <li>
              <Link to="/" className="block" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="block" onClick={toggleMenu}>
                Favorites
              </Link>
            </li>
            <li>
              <Link to="/cart" className="block" onClick={toggleMenu}>
                Cart
              </Link>
            </li>
            <li>
              <Link to="/about" className="block" onClick={toggleMenu}>
                About
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
