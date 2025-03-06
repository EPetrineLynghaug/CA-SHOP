import { useState, useRef } from "react";

export default function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  // Beholder initialverdiene slik at resetForm alltid bruker de opprinnelige verdiene.
  const initialValuesRef = useRef(initialValues);

  // Utvidet valideringslogikk
  const validateField = (name, value) => {
    let error = "";
    if (!value.trim()) {
      return `${name} is required`;
    }
    switch (name) {
      case "email": {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(value)) {
          error = "Invalid email address";
        }
        break;
      }
      case "name": {
        // Fjern alle tegn som ikke er bokstaver og sjekk om lengden er minst 2
        const letterCount = value.replace(/[^A-Za-zæøåÆØÅ]/g, "").length;
        if (letterCount < 2) {
          error = "Name must contain at least two letters";
        }
        break;
      }
      case "fullName": {
        // Krever minst to ord med bokstaver (f.eks. fornavn og etternavn)
        const fullNameRegex = /^[A-Za-zæøåÆØÅ]+(?:\s+[A-Za-zæøåÆØÅ]+)+$/;
        if (!fullNameRegex.test(value)) {
          error =
            "Full Name must include at least first and last name (letters only)";
        }
        break;
      }
      case "address": {
        if (value.trim().length < 5) {
          error = "Address seems too short";
        }
        break;
      }
      case "zipCode": {
        const zipRegex = /^\d{3,10}$/;
        if (!zipRegex.test(value)) {
          error = "Invalid ZIP Code";
        }
        break;
      }
      case "city": {
        const cityRegex = /^[A-Za-zæøåÆØÅ\s]+$/;
        if (!cityRegex.test(value)) {
          error = "City must contain only letters and spaces";
        }
        break;
      }
      case "phoneNumber": {
        const phoneRegex = /^[0-9+\s\-()]+$/;
        if (!phoneRegex.test(value)) {
          error = "Invalid phone number";
        }
        break;
      }
      default:
        break;
    }
    return error;
  };

  // Håndterer endringer på inputfeltene
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Håndterer innsending av skjemaet og kjører callback hvis alt er validert
  const handleSubmit = (e, callback) => {
    e.preventDefault();
    const validationErrors = {};
    for (let field in values) {
      validationErrors[field] = validateField(field, values[field]);
    }
    setErrors(validationErrors);
    const hasErrors = Object.values(validationErrors).some((error) => error);
    if (!hasErrors) {
      callback();
    }
  };

  // Tilbakestiller skjemaet til initialverdiene
  const resetForm = () => {
    setValues(initialValuesRef.current);
    setErrors({});
  };

  return { values, errors, handleChange, handleSubmit, resetForm };
}
