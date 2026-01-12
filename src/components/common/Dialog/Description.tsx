import type { ReactNode } from "react";

export default function Description({ children }: { children: ReactNode }) {
  return <p className="text-base font-medium text-gray-600">{children}</p>;
}
