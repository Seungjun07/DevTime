export default function TechStack() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="studyStack"
          className="text-[14px] leading-[18px] font-medium text-gray-600"
        >
          공부/사용 중인 기술 스택(선택)
        </label>
        <div className="relative w-full">
          <input
            id="studyStack"
            className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3"
            placeholder="기술 스택을 검색해 등록해 주세요."
          />
        </div>
      </div>
    </div>
  );
}
