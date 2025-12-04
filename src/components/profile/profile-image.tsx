import { useEffect, useState, type ChangeEvent } from "react";

type Props = {
  defaultImage?: string;
  onFileSelect: (file: File | null) => void;
};

export default function ProfileImage({ defaultImage, onFileSelect }: Props) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);

  useEffect(() => {
    if (defaultImage) setPreview(defaultImage);
  }, [defaultImage]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const selectedFile = e.target.files[0];

    if (!["image/png", "image/jpeg"].includes(selectedFile.type)) {
      alert("png 또는 jpg 파일만 업로드 가능합니다.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("5MB 이하 파일만 업로드 가능합니다.");
      return;
    }

    onFileSelect(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-sm leading-[18px] font-medium text-gray-600">
        프로필 이미지
      </p>
      <div className="flex gap-3">
        <label
          className={`border-primary-blue flex h-30 w-30 cursor-pointer items-center justify-center rounded-lg ${!preview && "border"} border-dashed bg-white`}
        >
          <input
            onChange={handleFileChange}
            type="file"
            accept=".png, .jpg, .jpeg"
            className="hidden"
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
        <p className="self-end text-sm leading-4.5 font-medium text-gray-500">
          5MB 미만의 .png, .jpg 파일
        </p>
      </div>
    </div>
  );
}
