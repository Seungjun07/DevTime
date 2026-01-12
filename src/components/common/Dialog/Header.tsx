import type { ReactNode } from "react";

export default function Header({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xl leading-6 font-semibold text-gray-800">
      {children}
    </h2>
  );
}
