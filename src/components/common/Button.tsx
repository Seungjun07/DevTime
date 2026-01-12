import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "../../utils/cn";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export default function Button({
  children,
  variant,
  size,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

const buttonVariants = cva("font-semibold rounded cursor-pointer px-4 py-3", {
  variants: {
    variant: {
      primary:
        "bg-primary-blue text-white disabled:bg-disabled-400 disabled:text-disabled-300 disabled:cursor-not-allowed",
      secondary:
        "bg-primary-blue/10 text-primary-blue disabled:bg-disabled-200 disabled:text-disabled-400 disabled:cursor-not-allowed",
      tertiary: "bg-tertiary text-primary-blue",
    },
    size: {
      lg: "text-lg h-12",
      md: "text-base",
      sm: "text-sm",
      login: "h-12 w-82 text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "lg",
  },
});
