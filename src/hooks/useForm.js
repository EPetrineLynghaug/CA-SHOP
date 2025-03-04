import { useState, useRef } from "react";

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const initialValuesRef = useRef(initialValues);

  const validateField = (name, value) => {
    let error = "";
    if (!value.trim()) {
      error = `${name} is required`;
    }

    // E-postvalidering: Tillater vanlige spesialtegn i den lokale delen
    if (name === "email" && value) {
      const emailRegex =
        /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)*\.[A-Z]{2,}$/i;
      if (!emailRegex.test(value)) {
        error = "Invalid email address";
      }
    }

    // Navn-validering: Må inneholde minst én bokstav
    if (name === "name" && value) {
      const letterRegex = /[A-Za-zæøåÆØÅ]/;
      if (!letterRegex.test(value)) {
        error = "Name must contain at least one letter";
      }
    }

    return error;
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
