import React from "react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#4C5578" }} className="py-6">
      <div className="max-w-6xl mx-auto px-4 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} Essenza. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
