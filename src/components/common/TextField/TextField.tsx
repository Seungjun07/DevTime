import type { ReactNode } from "react";
import cn from "../../../utils/cn";
import TextFieldLabel from "./TextFieldLabel";
import TextFieldInput from "./TextFieldInput";
import TextFieldHelperText from "./TextFieldHelperText";
import { TextFieldContext } from "./TextFieldContext";

interface TextFieldProps {
  id: string;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export default function TextField({
  id,
  disabled,
  className,
  children,
}: TextFieldProps) {
  return (
    <TextFieldContext.Provider value={{ id, disabled }}>
      <div className={cn("flex w-105 flex-col gap-2", className)}>
        {children}
      </div>
    </TextFieldContext.Provider>
  );
}

TextField.Label = TextFieldLabel;
TextField.Input = TextFieldInput;
TextField.HelperText = TextFieldHelperText;
