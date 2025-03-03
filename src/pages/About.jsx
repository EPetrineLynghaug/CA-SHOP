import React from "react";
import ContactUsForm from "../components/ContactUsForm"; 

const About = () => {
  return (
    <>
      <h1>About This App</h1>
      <p>
        This application demonstrates fetching data from an API and using nested routing.
      </p>
      {/* Inkluder kontaktskjemaet */}
      <h2>Contact Us</h2>
      <ContactUsForm />
    </>
  );
};

export default About;