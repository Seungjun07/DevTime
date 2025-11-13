import { Link } from "react-router-dom";

export default function ProfileDetailPage() {
  return (
    <div className="m-auto flex h-[790px] w-[420px] flex-1 flex-col items-center gap-10">
      <div className="text-primary-blue text-2xl leading-[30px] font-bold">
        프로필 설정
      </div>

      <div className="h-[70px]">
        <label
          htmlFor="developCareer"
          className="text-[14px] leading-[18px] font-medium text-gray-600"
        >
          개발 경력
        </label>
        <div>
          <select
            id="developCareer"
            className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3"
          >
            <option value={""}>개발 경력을 선택해 주세요.</option>
            <option value={""}>경력 없음</option>
            <option value={""}>0-3년</option>
            <option value={""}>4-7년</option>
            <option value={""}>8-10년</option>
            <option value={""}>11년 이상</option>
          </select>
        </div>
      </div>

      <div className="mb-4 h-[70px]">
        <label
          htmlFor="studyPurpose"
          className="text-[14px] leading-[18px] font-medium text-gray-600"
        >
          공부 목적
        </label>
        <div>
          <select
            id="studyPurpose"
            className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3"
          >
            <option value={""}>공부의 목적을 선택해 주세요.</option>
            <option value={""}>취업 준비</option>
            <option value={""}>이직 준비</option>
            <option value={""}>단순 개발 역량 향상</option>
            <option value={""}>회사 내 프로젝트 원활하게 수행</option>
            <option value={""}>기타(직접 입력)</option>
          </select>
          <input
            className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3"
            placeholder="기타 "
          />
        </div>
      </div>

      <div className="h-[70px]">
        <label
          htmlFor="studyGoal"
          className="text-[14px] leading-[18px] font-medium text-gray-600"
        >
          공부 목표
        </label>
        <div>
          <input
            id="studyGoal"
            className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3"
            placeholder="공부 목표를 입력해 주세요."
          />
        </div>
      </div>

      <div className="h-[70px]">
        <label
          htmlFor="studyStack"
          className="text-[14px] leading-[18px] font-medium text-gray-600"
        >
          비밀번호 확인
        </label>
        <div>
          <input
            id="studyStack"
            className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3"
            placeholder="기술 스택을 검색해 등록해 주세요."
          />
        </div>
      </div>

      <div className="h-[70px]">
        <label
          htmlFor="studyStack"
          className="text-[14px] leading-[18px] font-medium text-gray-600"
        >
          프로필 이미지
        </label>
        <div>
          <input
            id="studyStack"
            className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3"
            placeholder="기술 스택을 검색해 등록해 주세요."
          />
        </div>
      </div>

      <button className="bg-disabled-400 text-disabled-300 h-12 w-105 rounded px-4 py-3 text-lg leading-[22px] font-semibold">
        저장하기
      </button>

      <div>
        <Link className="text-primary-blue text-[16px] leading-5" to={"/"}>
          다음에 하시겠어요?
          <span className="ml-3 font-bold">건너뛰기</span>
        </Link>
      </div>
    </div>
  );
}
