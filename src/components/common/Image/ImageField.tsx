import type { ReactNode } from "react";
import Uploader from "./Uploader";
import HelperText from "./HelperText";

interface ImageFieldProps {
  id: string;
  children: ReactNode;
}

export default function ImageField({ id, children }: ImageFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-sm leading-[18px] font-medium text-gray-600">
        프로필 이미지
      </p>
      {children}
    </div>
  );
}

ImageField.Uploader = Uploader;
ImageField.HelperText = HelperText;
