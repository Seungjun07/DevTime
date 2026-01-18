import { useState } from "react";
import {
  validateConfirmPassword,
  validateEmail,
  validateNickname,
  validatePassword,
} from "../../../utils/validate";
import type { SignUpFormData } from "../types";

export function useSignUpForm() {
  const [values, setValues] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    nickname: false,
    password: false,
    confirmPassword: false,
  });

  const errors = {
    email: touched.email ? validateEmail(values.email) : "",
    nickname: touched.nickname ? validateNickname(values.nickname) : "",
    password: touched.password ? validatePassword(values.password) : "",
    confirmPassword: touched.confirmPassword
      ? validateConfirmPassword(values.password, values.confirmPassword)
      : "",
  };

  function handleChange(key: keyof SignUpFormData, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleBlur(key: keyof SignUpFormData) {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }

  const isValid =
    values.email &&
    values.nickname &&
    values.password &&
    values.confirmPassword &&
    !errors.email &&
    !errors.nickname &&
    !errors.password &&
    !errors.confirmPassword;

  return { values, errors, isValid, handleChange, handleBlur };
}
