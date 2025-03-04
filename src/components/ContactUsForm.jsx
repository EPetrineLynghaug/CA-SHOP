import React from "react";
import useForm from "../hooks/useForm";

export default function ContactUsForm() {
  const initialValues = { name: "", email: "", message: "" };
  const { values, errors, handleChange, handleSubmit, resetForm } = useForm(initialValues);

  const submitForm = () => {
    // Her kan du f.eks. sende data til en server
    console.log("Form submitted with values:", values);
    alert("Thank you for contacting us!");
    resetForm();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, submitForm)} className="max-w-lg mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="name" className="block font-bold mb-2">
          Name:
        </label>
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

      <div className="mb-4">
        <label htmlFor="email" className="block font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          className="w-full border p-2"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block font-bold mb-2">
          Message:
        </label>
        <textarea
          name="message"
          id="message"
          value={values.message}
          onChange={handleChange}
          className="w-full border p-2"
          rows="5"
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Send
      </button>
    </form>
  );
}
