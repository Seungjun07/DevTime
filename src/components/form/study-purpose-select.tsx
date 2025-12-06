interface StudyPurposeProps {
  selectValue: string;
  detailValue: string;
  onSelectChange: (value: string) => void;
  onDetailChange: (value: string) => void;
  className?: string;
}

export default function StudyPurPoseSelect({
  selectValue,
  detailValue,
  onSelectChange,
  onDetailChange,
  className,
}: StudyPurposeProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="studyPurpose"
        className="text-[14px] leading-[18px] font-medium text-gray-600"
      >
        공부 목적
      </label>
      <select
        value={selectValue}
        onChange={(e) => onSelectChange(e.target.value)}
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
      {selectValue === "기타" && (
        <input
          className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3"
          placeholder="직접 입력"
          value={detailValue}
          onChange={(e) => onDetailChange(e.target.value)}
        />
      )}
    </div>
  );
}
