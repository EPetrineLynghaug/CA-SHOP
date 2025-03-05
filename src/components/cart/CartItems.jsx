import React from "react";



export default function CartItems({ cart, products, updateCartQuantity, removeFromCart }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <ul className="divide-y divide-gray-200">
        {cart.map((item) => {
          const prod = products.find((p) => p.id === item.id);
          const imageSrc = prod?.image?.url || prod?.images?.[0]?.url || "https://via.placeholder.com/50";
          const title = prod ? prod.title : item.title;
          const price = prod ? prod.price : item.price;
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
                    onClick={() => updateCartQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="px-3 py-1 text-gray-700"
                  >
                    –
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateCartQuantity(item.id, Number(e.target.value))}
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
  );
}

