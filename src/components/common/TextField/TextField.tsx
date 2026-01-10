import type { ReactNode } from "react";
import cn from "../../../utils/cn";

interface TextFieldProps {
  label: string;
  htmlFor: string;
  className?: string;
  children: ReactNode;
}

export default function TextField({
  label,
  htmlFor,
  className,
  children,
}: TextFieldProps) {
  return (
    <div className={cn("flex w-105 flex-col gap-2", className)}>
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-medium text-gray-600">
          {label}
        </label>
      )}
      {children}
    </div>
  );
}
