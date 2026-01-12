import { type ReactNode } from "react";
import { useTextFieldContext } from "./TextFieldContext";

export default function TextFieldLabel({ children }: { children: ReactNode }) {
  const { id } = useTextFieldContext();

  return (
    <label htmlFor={id} className="text-sm font-medium text-gray-600">
      {children}
    </label>
  );
}
