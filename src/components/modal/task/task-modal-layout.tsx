import { type ReactNode } from "react";

export default function TaskModalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      {/* 모달 박스 */}
      <div className="flex w-160 flex-col justify-between gap-9 rounded-lg bg-white px-9 py-12">
        {children}
      </div>
    </div>
  );
}
