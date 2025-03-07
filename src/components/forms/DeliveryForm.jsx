import React from "react";
import useForm from "../../hooks/useForm";

export default function DeliveryForm({ onSubmit }) {
  const initialDeliveryValues = {
    fullName: "",
    address: "",
    zipCode: "",
    city: "",
    phoneNumber: "",
    email: "",
    payment: "", // Nytt felt for betalingsmetode
  };

  const { values, errors, handleChange, handleSubmit } = useForm(initialDeliveryValues);

  // Wrapper-funksjon for å logge verdiene før vi kaller onSubmit
  const handleDeliverySubmit = (e) => {
    handleSubmit(e, () => {
      console.log("Delivery form submitted with values:", values);
      if (onSubmit) {
        onSubmit(values);
      }
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Enter Delivery Information</h2>
      <form className="space-y-4" onSubmit={handleDeliverySubmit}>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            placeholder="First and last name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            required
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={values.address}
            onChange={handleChange}
            placeholder="Street address and house number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            required
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700">ZIP Code</label>
            <input
              type="text"
              name="zipCode"
              value={values.zipCode}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              required
            />
            {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={values.city}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              required
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            required
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Payment Method</label>
          <select
            name="payment"
            value={values.payment}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            required
          >
            <option value="">Select payment method</option>
            <option value="vipps">Vipps</option>
            <option value="paypal">PayPal</option>
            <option value="visa">Visa</option>
          </select>
          {errors.payment && <p className="text-red-500 text-sm mt-1">{errors.payment}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-md shadow transition duration-200"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}
