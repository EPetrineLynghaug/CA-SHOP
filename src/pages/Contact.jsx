import React, { useState } from "react";
import ContactUsForm from "../components/forms/ContactUsForm";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  // Denne funksjonen kalles når skjemaet er sendt
  const handleFormSubmit = () => {
    setSubmitted(true);
    // Eventuelt kan du også sette en forsinkelse eller navigere til en annen rute
  };

  // Hvis skjemaet er sendt, vis en takkemelding
  if (submitted) {
    return (
      <div className="bg-gray-100 min-h-screen py-12 flex items-center justify-center">
        <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-700 text-xl">
            Thank you for your message. We appreciate your feedback and will get back to you as soon as possible.
          </p>
        </div>
      </div>
    );
  }

  // Hvis skjemaet ikke er sendt, vis kontaktsiden med informasjonstekst og skjema
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            {/* Venstre kolonne – Informasjonstekst */}
            <div className="md:w-1/2 p-8 bg-[#D0E6D1]">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-left">
                Get in Touch
              </h2>
              <p className="text-gray-700 text-xl leading-relaxed text-left">
                We truly value what you have to say. Our customers are our highest priority,
                and your feedback helps us continuously improve our service. Please feel free
                to reach out with any questions, suggestions, or comments. We appreciate your support!
              </p>
            </div>
            {/* Høyre kolonne – Kontaktskjema */}
            <div className="md:w-1/2 p-8">
              <ContactUsForm onSubmit={handleFormSubmit} hideHeader={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
