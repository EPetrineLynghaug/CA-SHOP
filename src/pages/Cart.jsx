import React from "react";
import { Link } from "react-router";
import useProductStore from "../store/productStore";

export default function Cart() {
  const { cart, getCartTotal, removeFromCart, updateCartQuantity } = useProductStore();

  // Beregn subtotal, MVA og total med MVA
  const subTotal = getCartTotal();
  const vatRate = 0.25; // 25% MVA
  const vatAmount = subTotal * vatRate;
  const totalWithVAT = subTotal + vatAmount;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length > 0 ? (
        <div>
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={item.id} className="flex flex-col sm:flex-row items-center justify-between py-2">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    Price: ${item.price} each
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  <label className="text-sm text-gray-500">
                    Quantity:
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateCartQuantity(item.id, Number(e.target.value))
                      }
                      className="ml-2 w-16 p-1 border rounded"
                    />
                  </label>
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="font-bold">Subtotal: ${subTotal.toFixed(2)}</p>
            <p className="font-bold">MVA (25%): ${vatAmount.toFixed(2)}</p>
            <p className="font-bold">Total: ${totalWithVAT.toFixed(2)}</p>
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