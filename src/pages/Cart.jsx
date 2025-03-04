import React, { useState } from "react";
import { Link } from "react-router";
import useProductStore from "../store/productStore";

export default function Cart() {
  const { 
    cart, 
    getCartTotal, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart 
  } = useProductStore();

  const [showReceipt, setShowReceipt] = useState(false);
  const [orderTotal, setOrderTotal] = useState(null);

  // Calculate subtotal, VAT, and total
  const subTotal = getCartTotal();
  const vatRate = 0.25; // 25% VAT
  const vatAmount = subTotal * vatRate;
  const totalWithVAT = subTotal + vatAmount;

  // Handle form submission: save order total, clear cart, then show receipt
  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderTotal(totalWithVAT);
    clearCart();
    setShowReceipt(true);
  };

  // If the order is confirmed, show a receipt/confirmation message with the correct total
  if (showReceipt) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Order Confirmed</h1>
        <p className="text-lg mb-4">Thank you for your purchase!</p>
        <p className="text-lg mb-6">
          Your order total was <strong>${orderTotal.toFixed(2)}</strong>.
        </p>
        <Link to="/">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back button */}
      <Link to="/" className="text-sm text-gray-500 mb-4 inline-flex items-center">
        <span className="mr-1">&lt;</span> Back
      </Link>

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cart.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: Cart Items */}
          <div className="md:w-2/3">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.id} className="py-4 flex">
                  {/* Small product image: check both imageUrl and image */}
                  <img
                    src={item.imageUrl || item.image || "https://via.placeholder.com/50"}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded mr-4"
                  />
                  <div className="flex-1 flex flex-col sm:flex-row justify-between">
                    {/* Product info */}
                    <div>
                      <p className="font-medium text-lg">{item.title}</p>
                      <div className="flex items-center space-x-3 mt-1 text-sm text-gray-600">
                        <span>Price: ${item.price}</span>
                      </div>
                    </div>

                    {/* Quantity controls and Remove button */}
                    <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                      <div className="flex items-center border rounded">
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="px-2 py-1 text-gray-700"
                        >
                          –
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartQuantity(item.id, Number(e.target.value))
                          }
                          className="w-12 text-center focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-700"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Summary and Delivery Form */}
          <div className="md:w-1/3">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="p-4 bg-gray-50 rounded shadow">
              <p className="flex justify-between mb-2">
                <span>Subtotal (excl. VAT):</span>
                <span>${subTotal.toFixed(2)}</span>
              </p>
              <p className="flex justify-between mb-2">
                <span>VAT (25%):</span>
                <span>${vatAmount.toFixed(2)}</span>
              </p>
              <p className="flex justify-between font-bold text-lg">
                <span>Total (incl. VAT):</span>
                <span>${totalWithVAT.toFixed(2)}</span>
              </p>
            </div>

            {/* Delivery Information Form */}
            <div className="mt-6 p-4 bg-white rounded shadow">
              <h3 className="text-lg font-semibold mb-4">Enter Delivery Information</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="First and last name"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Address</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Street address and house number"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block mb-1 font-medium">ZIP Code</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block mb-1 font-medium">City</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-green-600 text-white rounded mt-4"
                >
                  Confirm Order
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-lg">Your cart is empty.</p>
      )}
    </div>
  );
}
