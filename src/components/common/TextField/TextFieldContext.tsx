import { createContext, useContext } from "react";

interface TextFieldContextValue {
  id: string;
  disabled?: boolean;
}

export const TextFieldContext = createContext<TextFieldContextValue | null>(
  null,
);

export function useTextFieldContext() {
  const context = useContext(TextFieldContext);
  if (!context)
    throw new Error("TextFieldContext muse be used inside TextField");

  return context;
}
