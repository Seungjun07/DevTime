import type { ReactNode } from "react";

export default function Footer({ children }: { children: ReactNode }) {
  return <div className="flex justify-end gap-4">{children}</div>;
}
