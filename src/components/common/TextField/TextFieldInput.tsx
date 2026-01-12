import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes } from "react";
import cn from "../../../utils/cn";
import { useTextFieldContext } from "./TextFieldContext";

interface TextFieldInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof textfieldInputVariant> {}

const TextFieldInput = forwardRef<HTMLInputElement, TextFieldInputProps>(
  ({ state, inputSize, className, ...props }, ref) => {
    const { id, disabled } = useTextFieldContext();

    return (
      <input
        ref={ref}
        id={id}
        disabled={disabled}
        className={cn(textfieldInputVariant({ state, inputSize }), className)}
        {...props}
      />
    );
  },
);

const textfieldInputVariant = cva(
  "rounded px-4 py-3 h-11 font-medium outline-none w-full",
  {
    variants: {
      state: {
        default: "bg-gray-50 text-gray-800 placeholder:text-disabled-300",
        error:
          "bg-gray-50 text-gray-800 placeholder:text-disabled-300 border border-negative",
      },
      inputSize: {
        md: "text-base",
        sm: "text-sm",
      },
    },
    defaultVariants: {
      state: "default",
      inputSize: "md",
    },
  },
);

TextFieldInput.displayName = "TextFieldInput";

export default TextFieldInput;
