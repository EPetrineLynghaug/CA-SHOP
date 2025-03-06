import React from "react";
import useForm from "../../hooks/useForm";

export default function ContactUsForm({ hideHeader = false }) {
  // Initial form values
  const initialValues = { name: "", email: "", message: "" };

  // useForm hook håndterer state, validering og reset av skjemaet
  const { values, errors, handleChange, handleSubmit, resetForm } = useForm(initialValues);

  // Callback som kalles når skjemaet valideres og sendes inn
  const submitForm = () => {
    console.log("Contact form submitted with values:", values);
    alert("Thank you for contacting us!");
    resetForm();
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e, submitForm)}
      className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg"
    >
      {/* Vis skjemaoverskriften med mindre den skal skjules */}
      {!hideHeader && (
        <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
      )}

      {/* Navn-felt */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full border border-gray-300 rounded-lg p-3 
                     focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* E-post-felt */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-lg p-3 
                     focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Melding-felt */}
      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          value={values.message}
          onChange={handleChange}
          placeholder="Enter your message"
          rows="5"
          className="w-full border border-gray-300 rounded-lg p-3 
                     focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>

      {/* Send-knapp */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
      >
        Send
      </button>
    </form>
  );
}
