export default function ProfileImage() {
  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-sm leading-[18px] font-medium text-gray-600">
        프로필 이미지
      </p>
      <div className="flex gap-3">
        <div className="border-primary-blue h-30 w-30 rounded-lg border border-dashed bg-white p-10">
          이미지
        </div>
        <p className="self-end text-sm leading-4.5 font-medium text-gray-500">
          5MB 미만의 .png, .jpg 파일
        </p>
      </div>
    </div>
  );
}
