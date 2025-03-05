import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaSearch,
} from "react-icons/fa";
import useProductStore from "../../store/productStore";

export default function Header() {
  const { cart, favourites } = useProductStore();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalFavourites = favourites.length;

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  // Sett initial søkestreng dersom den finnes i URL-en
  useEffect(() => {
    const q = new URLSearchParams(location.search).get("q") || "";
    setSearchQuery(q);
  }, [location.search]);

  // Oppdater URL kun på startsiden
  useEffect(() => {
    if (!isHomePage) return;
    const currentQuery = new URLSearchParams(location.search).get("q") || "";
    if (searchQuery.trim() !== currentQuery) {
      const newUrl = searchQuery.trim()
        ? `/?q=${encodeURIComponent(searchQuery)}`
        : "/";
      navigate(newUrl, { replace: true });
    }
  }, [searchQuery, navigate, isHomePage, location.search]);

  return (
    <>
      <header className="border-b">
        {/* Øverste stripe */}
        {isHomePage && (
        <div className="bg-neutral-200 text-center py-2 text-sm">
          <p>Always free shipping</p>
        </div>
          )}

        {/* Hoved-navigasjon */}
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Hamburger for mobil */}
            <button
              onClick={toggleMenu}
              className="md:hidden focus:outline-none text-gray-700 hover:text-black transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <Link to="/" className="text-xl font-bold">
              Essenza
            </Link>
            {/* Desktop-navigasjonsmeny */}
            <ul className="hidden md:flex space-x-6 ml-6">
              <li>
                <Link to="/" className="hover:text-blue-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-blue-500">
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-blue-500">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Søkefelt med ikon */}
          <div className="flex-1 mx-4 relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
            />
            <FaSearch
              size={20}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Høyre: Favoritter og handlekurv */}
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
                  className="transition-transform duration-300 ease-in-out text-gray-700 hover:scale-110"
                />
              )}
              {totalFavourites > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#4C5578] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
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
                <span className="absolute -top-2 -right-2 bg-[#4C5578] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
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
                <Link to="/contact" className="block" onClick={toggleMenu}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Banner under header – vises bare på home-siden */}
      {isHomePage && (
        <div className="bg-[#D0E6D1] text-center py-4">
          <p className="text-lg font-bold text-gray-800">
            Now Crazy Week - Amazing Deals!
          </p>
        </div>
      )}
    </>
  );
}
