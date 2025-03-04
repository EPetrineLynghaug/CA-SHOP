import React, { useState } from "react";
import { Link } from "react-router";
import useProductStore from "../store/productStore";
import { useProducts } from "../hooks/productsApi";

export default function Cart() {
  // Hent produktdata via useProducts-hook
  const { products, loading, error } = useProducts();

  // Hent cart- og favorittfunksjonalitet fra produktstore
  const { 
    cart, 
    getCartTotal, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart,
    addToCart,
    favourites
  } = useProductStore();

  const [showReceipt, setShowReceipt] = useState(false);
  const [orderTotal, setOrderTotal] = useState(null);

  // Kalkuler subtotal, mva og total
  const subTotal = getCartTotal();
  const vatRate = 0.25;
  const vatAmount = subTotal * vatRate;
  const totalWithVAT = subTotal + vatAmount;

  // Håndter innsending: lagre total, tøm cart og vis kvittering
  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderTotal(totalWithVAT);
    clearCart();
    setShowReceipt(true);
  };

  // Finn favoritter som ikke allerede er i carten
  const additionalFavorites = favourites.filter(
    (fav) => !cart.some((item) => item.id === fav.id)
  );

  if (loading) {
    return <p className="text-center py-8">Laster produkter...</p>;
  }
  if (error) {
    return (
      <p className="text-center py-8 text-red-500">
        Feil ved henting av produkter: {error.message}
      </p>
    );
  }
  if (showReceipt) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Confirmed</h1>
        <p className="mb-4 text-lg">Thank you for your purchase!</p>
        <p className="mb-8 text-lg">
          Your order total was <span className="font-semibold">${orderTotal.toFixed(2)}</span>.
        </p>
        <Link to="/">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Tilbakeknapp */}
      <Link to="/" className="text-sm text-gray-500 inline-flex items-center mb-6">
        <span className="mr-1">&larr;</span> Back
      </Link>
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cart.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-10">
          {/* Cart Items */}
          <div className="md:w-2/3">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => {
                  // Finn produktdetaljer basert på id
                  const productDetails = products.find((p) => p.id === item.id);
                  let imageSrc = "https://via.placeholder.com/50";
                  if (productDetails) {
                    if (productDetails.image && productDetails.image.url) {
                      imageSrc = productDetails.image.url;
                    } else if (
                      Array.isArray(productDetails.images) &&
                      productDetails.images.length > 0 &&
                      productDetails.images[0].url
                    ) {
                      imageSrc = productDetails.images[0].url;
                    }
                  }
                  const title = productDetails ? productDetails.title : item.title;
                  const price = productDetails ? productDetails.price : item.price;
                  return (
                    <li key={item.id} className="py-4 flex items-center">
                      <img
                        src={imageSrc}
                        alt={title}
                        className="w-16 h-16 object-cover rounded mr-4 border"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-lg">{title}</p>
                        <p className="text-gray-600">Price: ${price}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border rounded">
                          <button
                            type="button"
                            onClick={() =>
                              updateCartQuantity(item.id, Math.max(1, item.quantity - 1))
                            }
                            className="px-3 py-1 text-gray-700"
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
                            className="w-12 text-center border-l border-r outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-700"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Summary & Delivery Form */}
          <div className="md:w-1/3 space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal (excl. VAT):</span>
                  <span>${subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (25%):</span>
                  <span>${vatAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total (incl. VAT):</span>
                  <span>${totalWithVAT.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Enter Delivery Information</h2>
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
                  className="w-full py-3 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
                >
                  Confirm Order
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-lg text-center">Your cart is empty.</p>
      )}

      {/* Favoritter som ikke er i cart */}
      {additionalFavorites.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Add more of your favorites
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {additionalFavorites.map((fav) => {
              let favImageSrc = "https://via.placeholder.com/100";
              if (fav.image && fav.image.url) {
                favImageSrc = fav.image.url;
              } else if (
                Array.isArray(fav.images) &&
                fav.images.length > 0 &&
                fav.images[0].url
              ) {
                favImageSrc = fav.images[0].url;
              }
              return (
                <li
                  key={fav.id}
                  className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center"
                >
                  <img
                    src={favImageSrc}
                    alt={fav.title}
                    className="w-24 h-24 object-cover rounded-full mb-3 border"
                  />
                  <p className="font-medium mb-1">{fav.title}</p>
                  <p className="text-gray-600 mb-3">${fav.price}</p>
                  <button
                    onClick={() => addToCart(fav)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                  >
                    Add to Cart
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
