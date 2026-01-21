import type { ChangeEvent } from "react";

interface UploadProps {
  preview?: string | null;
  disabled: boolean;
  onFileSelect: (file: File | null) => void;
}

export default function Uploader({
  preview,
  disabled,
  onFileSelect,
}: UploadProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    onFileSelect(file);
  };

  return (
    <label
      className={`border-primary-blue flex h-30 w-30 cursor-pointer items-center ${preview ? "border-none" : "border"} justify-center rounded-lg border-dashed bg-white`}
    >
      <input
        onChange={handleFileChange}
        disabled={disabled}
        type="file"
        accept=".png, .jpg, .jpeg"
        hidden
      />
      {preview ? (
        <img
          src={preview}
          alt="이미지 미리보기"
          className="h-full w-full rounded-lg object-cover"
        />
      ) : (
        <span className="text-primary-blue text-4xl">+</span>
      )}
    </label>
  );
}
