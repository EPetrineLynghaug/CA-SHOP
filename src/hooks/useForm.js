import { useState, useRef } from "react";

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const initialValuesRef = useRef(initialValues);

  const validateField = (name, value) => {
    if (!value.trim()) return `${name} is required`;

    switch (name) {
      case "email": {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(value)) return "Invalid email address";
        break;
      }
      case "name": {
        const letterRegex = /[A-Za-zæøåÆØÅ]/;
        if (!letterRegex.test(value))
          return "Name must contain at least one letter";
        break;
      }
      case "fullName": {
        // Krever minst to ord med bokstaver (fornavn og etternavn)
        const fullNameRegex = /^[A-Za-zæøåÆØÅ]+(?:\s+[A-Za-zæøåÆØÅ]+)+$/;
        if (!fullNameRegex.test(value))
          return "Full Name must include at least first and last name (letters only)";
        break;
      }
      case "address": {
        if (value.trim().length < 5) return "Address seems too short";
        break;
      }
      case "zipCode": {
        const zipRegex = /^\d{3,10}$/;
        if (!zipRegex.test(value)) return "Invalid ZIP Code";
        break;
      }
      case "city": {
        const cityRegex = /^[A-Za-zæøåÆØÅ\s]+$/;
        if (!cityRegex.test(value))
          return "City must contain only letters and spaces";
        break;
      }
      case "phoneNumber": {
        const phoneRegex = /^[0-9+\s\-()]+$/;
        if (!phoneRegex.test(value)) return "Invalid phone number";
        break;
      }
      default:
        break;
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

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

  const resetForm = () => {
    setValues(initialValuesRef.current);
    setErrors({});
  };

  return { values, errors, handleChange, handleSubmit, resetForm };
}

export default useForm;
