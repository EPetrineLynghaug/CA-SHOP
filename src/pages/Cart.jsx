import React from "react";
import { Link } from "react-router";
import useProductStore from "../store/productStore";

export default function Cart() {
  const { cart, getCartTotal, removeFromCart } = useProductStore();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length > 0 ? (
        <div>
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity} x ${item.price}
                  </p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="font-bold">Total: ${getCartTotal()}</p>
          </div>
          <div className="mt-6">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md">
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div className="mt-6">
        <Link to="/favorites">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md">
            Back to Favorites
          </button>
        </Link>
      </div>
    </div>
  );
}
