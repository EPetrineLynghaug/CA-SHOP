import React, { useState } from "react";
import { Link } from "react-router"; 
import { FaBars, FaTimes, FaShoppingCart, FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import useProductStore from "../../store/productStore";

export default function Header() {
  const { cart, favourites } = useProductStore();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalFavourites = favourites.length;

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="border-b">
      {/* Øverste stripe */}
      <div className="bg-neutral-200 text-center py-2 text-sm">
        <p>Always free shipping</p>
      </div>

      {/* Hoved-navigasjon */}
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Venstre: Hamburger (mobil) og logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none text-gray-700 hover:text-black transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <Link to="/" className="text-xl font-bold">
            My Store
          </Link>
        </div>

        {/* Midten: Søkefelt med søkeikon */}
        <div className="flex-1 mx-4 relative">
          <FaSearch
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Høyre: Favoritter + handlekurv */}
        <div className="flex items-center space-x-4">
          <Link to="/favorites" className="relative">
            {totalFavourites > 0 ? (
              <FaHeart
                size={24}
                className="transition-transform duration-300 ease-in-out text-black hover:scale-110"
              />
            ) : (
              <FaRegHeart
                size={24}
                className="transition-transform duration-300 ease-in-out text-white hover:scale-110"
              />
            )}
            {totalFavourites > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalFavourites}
              </span>
            )}
          </Link>

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

      {/* Mobilmeny */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="px-4 py-2 space-y-2">
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
