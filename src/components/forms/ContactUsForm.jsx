import React, { useState, useEffect } from "react";
import useForm from "../../hooks/useForm";

export default function ContactUsForm({ hideHeader = false }) {
  // Initial form values for required fields
  const initialValues = {
    fullName: "",
    subject: "",
    email: "",
    body: "",
  };

  // useForm hook now uses the built-in validation from our updated hook.
  const { values, errors, handleChange, handleSubmit, resetForm } =
    useForm(initialValues);

  // State to control the success banner.
  const [showSuccess, setShowSuccess] = useState(false);

  // Callback invoked when the form is successfully submitted.
  const submitForm = () => {
    console.log("Contact form submitted with values:", values);
    setShowSuccess(true);
    resetForm();
  };

  // Hide the success banner after 10 seconds.
  useEffect(() => {
    let timer;
    if (showSuccess) {
      timer = setTimeout(() => {
        setShowSuccess(false);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [showSuccess]);

  return (
    <div className="max-w-lg mx-auto">
      {showSuccess && (
        <div className="bg-green-500 text-white text-center py-4 rounded-t-lg mb-4">
          Thank you for contacting us!
        </div>
      )}
      <form
        onSubmit={(e) => handleSubmit(e, submitForm)}
        className="p-8 bg-white shadow-lg rounded-lg"
      >
        {!hideHeader && (
          <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
        )}

        {/* Full Name Field */}
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-semibold mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={values.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            required
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Subject Field */}
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-gray-700 font-semibold mb-2"
          >
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={values.subject}
            onChange={handleChange}
            placeholder="Enter the subject"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            required
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Message Field */}
        <div className="mb-6">
          <label
            htmlFor="body"
            className="block text-gray-700 font-semibold mb-2"
          >
            Message
          </label>
          <textarea
            name="body"
            id="body"
            value={values.body}
            onChange={handleChange}
            placeholder="Enter your message"
            rows="5"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            required
          />
          {errors.body && (
            <p className="text-red-500 text-sm mt-1">{errors.body}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
