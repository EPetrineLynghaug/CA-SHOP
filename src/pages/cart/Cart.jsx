import React, { useState } from "react";
import { Link } from "react-router";
import { useProducts } from "../../hooks/useProductsApi";
import useProductStore from "../../store/productStore";
import CartItems from "../../components/cart/CartItems";
import OrderSummary from "../../components/cart/OrderSummary";
import DeliveryForm from "../../components/forms/DeliveryForm";
import Spinner from "../../components/Spinner"; 

export default function Cart() {
  // Henter produktene fra API (via hook) og state fra Zustand-storen
  const { products, loading, error } = useProducts();
  const {
    cart,
    getCartTotal,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    addToCart,
    favourites,
  } = useProductStore();

  // Lokalt state for bestillingsbekreftelse
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderTotal, setOrderTotal] = useState(null);

  // Kalkulerer prisdetaljene
  const subTotal = getCartTotal();
  const vatRate = 0.25;
  const vatAmount = subTotal * vatRate;
  const totalWithVAT = subTotal + vatAmount;

  // Når leveringsinformasjonen sendes inn: lagre totalpris, tømm handlekurven og vis bekreftelse
  const onDeliverySubmit = (deliveryValues) => {
    console.log("Delivery info received:", deliveryValues);
    setOrderTotal(totalWithVAT);
    clearCart();
    setOrderConfirmed(true);
  };

  // Filtrerer favoritter direkte (uten useMemo)
  const additionalFavorites = favourites.filter(
    (fav) => !cart.some((item) => item.id === fav.id)
  );

  if (loading) return <Spinner />;
  if (error)
    return (
      <p className="text-center py-8 text-red-500">
        Error: {error.message}
      </p>
    );

  // Bestillingsbekreftelse: vis totalpris og en knapp for å fortsette shopping
  if (orderConfirmed) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Order Confirmed</h1>
        <p className="mb-4 text-lg">Thank you for your purchase!</p>
        {orderTotal !== null && (
          <p className="mb-8 text-lg">
            Your order total was{" "}
            <span className="font-semibold">${orderTotal.toFixed(2)}</span>.
          </p>
        )}
        <Link
          to="/"
          className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Hovedvisning: cart med ordreoversikt og leveringsskjema
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/" className="text-sm text-gray-500 inline-flex items-center mb-6">
        <span className="mr-1">&larr;</span> Back
      </Link>
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cart.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-2/3">
            <CartItems
              cart={cart}
              products={products}
              updateCartQuantity={updateCartQuantity}
              removeFromCart={removeFromCart}
            />
          </div>
          <div className="md:w-1/3 space-y-6">
            <OrderSummary
              subTotal={subTotal}
              vatAmount={vatAmount}
              totalWithVAT={totalWithVAT}
            />
            <DeliveryForm onSubmit={onDeliverySubmit} />
          </div>
        </div>
      ) : (
        <p className="text-lg text-center">Your cart is empty.</p>
      )}
      {additionalFavorites.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Add more of your favorites
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {additionalFavorites.map((fav) => {
              const favImageSrc =
                fav.image?.url ||
                (Array.isArray(fav.images) && fav.images.length > 0 && fav.images[0].url) ||
                "https://via.placeholder.com/100";
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
