import React, { useState } from "react";
import { useNavigate } from "react-router";
import useForm from "../../hooks/useForm";
import useProductStore from "../../store/productStore";

export default function Checkout() {
  const { clearCart } = useProductStore();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const initialValues = { name: "", address: "", payment: "" };
  const { values, errors, handleChange, handleSubmit } = useForm(initialValues);

  const onSubmit = () => {
    clearCart();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Thank you for your order!</h1>
        <p>Your order has been successfully submitted.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form
        onSubmit={(e) => handleSubmit(e, onSubmit)}
        className="max-w-lg mx-auto space-y-4"
      >
        <div>
          <label htmlFor="name" className="block font-bold mb-2">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
            className="w-full border p-2"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="address" className="block font-bold mb-2">Address:</label>
          <input
            type="text"
            name="address"
            id="address"
            value={values.address}
            onChange={handleChange}
            className="w-full border p-2"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        <div>
          <label htmlFor="payment" className="block font-bold mb-2">Payment Method:</label>
          <select
            name="payment"
            id="payment"
            value={values.payment}
            onChange={handleChange}
            className="w-full border p-2"
            required
          >
            <option value="">Select payment method</option>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bankTransfer">Bank Transfer</option>
          </select>
          {errors.payment && <p className="text-red-500 text-sm">{errors.payment}</p>}
        </div>

        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
          Pay
        </button>
      </form>
    </div>
  );
}
