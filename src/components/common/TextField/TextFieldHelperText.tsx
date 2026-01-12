import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "../../../utils/cn";

type TextFieldHelperTextProps = {
  children: ReactNode;
} & VariantProps<typeof helperTextVariants>;

const helperTextVariants = cva("text-xs pt-2 leading-4 font-medium", {
  variants: {
    status: {
      error: "text-negative",
      success: "text-positive",
      default: "text-gray-500",
    },
  },
  defaultVariants: {
    status: "default",
  },
});

export default function TextFieldHelperText({
  children,
  status,
}: TextFieldHelperTextProps) {
  return <p className={cn(helperTextVariants({ status }))}>{children}</p>;
}
