interface CareerSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function CareerSelect({
  value,
  onChange,
  className,
}: CareerSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="developCareer"
        className="text-[14px] leading-[18px] font-medium text-gray-600"
      >
        개발 경력
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        // onChange={(e) =>
        //   setProfileForm((prev) => ({ ...prev, career: e.target.value }))
        // }
        id="developCareer"
        className={`placeholder-custom ${className} rounded bg-gray-50 px-4 py-3`}
      >
        <option value={""}>개발 경력을 선택해 주세요.</option>
        <option value={"경력 없음"}>경력 없음</option>
        <option value={"0 - 3년"}>0-3년</option>
        <option value={"4 - 7년"}>4-7년</option>
        <option value={"8 - 10년"}>8-10년</option>
        <option value={"11년 이상"}>11년 이상</option>
      </select>
    </div>
  );
}
