import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes } from "react";
import cn from "../../../utils/cn";

interface TextFieldInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof textfieldInputVariant> {}

const TextFieldInput = forwardRef<HTMLInputElement, TextFieldInputProps>(
  ({ variant, inputSize, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(textfieldInputVariant({ variant, inputSize }), className)}
        {...props}
      />
    );
  },
);

const textfieldInputVariant = cva(
  "rounded px-4 py-3 h-11 font-medium outline-none w-full",
  {
    variants: {
      variant: {
        default: "bg-gray-50 text-gray-800 placeholder:text-disabled-300",
        success: "",
        error: "",
      },
      inputSize: {
        md: "text-base",
        sm: "text-sm",
      },
    },
  },
);
//   className={`text-4 text-disabled-300 border bg-gray-50  leading-5 font-medium ${errors.email ? "border-red-500 focus:ring-2 focus:ring-red-400" : "border-gray-300 focus:ring-2 focus:ring-blue-400"}`}

export default TextFieldInput;
