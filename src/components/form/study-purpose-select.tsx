import { useState } from "react";

interface StudyPurposeProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function StudyPurPoseSelect({
  value,
  onChange,
  className,
}: StudyPurposeProps) {
  const [isCustom, setIsCustom] = useState(false);

  function handleSelectChange(selected: string) {
    if (selected === "기타") {
      setIsCustom(true);
      onChange("");
    } else {
      setIsCustom(false);
      onChange(selected);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="studyPurpose"
        className="text-[14px] leading-[18px] font-medium text-gray-600"
      >
        공부 목적
      </label>
      <select
        value={isCustom ? "기타" : value}
        onChange={(e) => handleSelectChange(e.target.value)}
        id="studyPurpose"
        className={`placeholder-custom ${className} rounded bg-gray-50 px-4 py-3`}
      >
        <option value={""}>공부의 목적을 선택해 주세요.</option>
        <option value={"취업 준비"}>취업 준비</option>
        <option value={"이직 준비"}>이직 준비</option>
        <option value={"단순 개발 역량 향상"}>단순 개발 역량 향상</option>
        <option value={"회사 내 프로젝트 원활하게 수행"}>
          회사 내 프로젝트 원활하게 수행
        </option>
        <option value={"기타"}>기타(직접 입력)</option>
      </select>
      {isCustom && (
        <input
          className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3"
          placeholder="직접 입력"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
