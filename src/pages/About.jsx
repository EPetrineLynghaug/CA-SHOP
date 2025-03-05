import React from "react";
import ContactUsForm from "../components/ContactUsForm";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            {/* Venstre kolonne – Informasjonstekst */}
            <div className="md:w-1/2 p-8 bg-blue-50">
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
              <ContactUsForm hideHeader={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
