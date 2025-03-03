import { useState, useRef } from "react";

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  // Lagre initialverdiene i en ref slik at de ikke endres ved re-render
  const initialValuesRef = useRef(initialValues);

  // Validering av et enkelt felt
  const validateField = (name, value) => {
    let error = "";
    if (!value.trim()) {
      error = `${name} is required`;
    }
    // Eksempel på e-postvalidering
    if (name === "email" && value) {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(value)) {
        error = "Invalid email address";
      }
    }
    return error;
  };

  // Håndter endringer på input-feltene
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Valider feltet med en gang og oppdater feil
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Håndter innsending av skjema
  const handleSubmit = (e, callback) => {
    e.preventDefault();
    // Valider alle feltene
    const validationErrors = {};
    for (let field in values) {
      validationErrors[field] = validateField(field, values[field]);
    }
    setErrors(validationErrors);

    // Dersom ingen feil finnes, kjør callbacken
    const hasErrors = Object.values(validationErrors).some((error) => error);
    if (!hasErrors) {
      callback();
    }
  };

  // Tilbakestill skjema til initialverdiene
  const resetForm = () => {
    setValues(initialValuesRef.current);
    setErrors({});
  };

  return { values, errors, handleChange, handleSubmit, resetForm };
}

export default useForm;
