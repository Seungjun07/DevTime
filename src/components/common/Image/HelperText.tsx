import type { ReactNode } from "react";

export default function HelperText({ children }: { children: ReactNode }) {
  return (
    <p className="self-end text-sm leading-4.5 font-medium text-gray-500">
      {children}
    </p>
  );
}
