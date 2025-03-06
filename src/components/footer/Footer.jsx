import React from "react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-[#4C5578] border-t border-gray-700 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-white text-base">
            &copy; {new Date().getFullYear()} Essenza. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/" className="text-white text-base hover:underline">
              Home
            </Link>
            <Link to="/contact" className="text-white text-base hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
