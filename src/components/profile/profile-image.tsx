import type { ChangeEvent } from "react";

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  preview?: string | null;
};

export default function ProfileImage({ onChange, preview }: Props) {
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
            onChange={onChange}
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
