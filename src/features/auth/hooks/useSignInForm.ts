import { useState } from "react";
import { validateEmail, validatePassword } from "../../../utils/validate";

export function useSignInForm() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const errors = {
    email: touched.email ? validateEmail(values.email) : "",
    password: touched.password ? validatePassword(values.password) : "",
  };

  function handleChange(key: "email" | "password", value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleBlur(key: "email" | "password") {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }

  const isValid =
    values.email && values.password && !errors.email && !errors.password;

  return { values, errors, isValid, handleChange, handleBlur };
}
