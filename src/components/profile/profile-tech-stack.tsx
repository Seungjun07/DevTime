import type { TechStack } from "../../types";

interface Props {
  keyword: string;
  suggestions: TechStack[];
}

export default function ProfileTechStack({ keyword, suggestions }: Props) {
  return (
    <div className="relative flex flex-col gap-2">
      <label
        htmlFor="studyStack"
        className="text-[14px] leading-[18px] font-medium text-gray-600"
      >
        공부/사용 중인 기술 스택(선택)
      </label>
      <input
        id="studyStack"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3 outline-none"
        placeholder="기술 스택을 검색해 등록해 주세요."
      />

      {keyword.trim() !== "" && (
        <ul className="scrollbar-hide border-disabled-300 absolute top-full mt-2 w-full space-y-4 overflow-y-auto rounded-[5px] border bg-white px-3 py-4 shadow-[0_8px_8px_0px_rgba(0,0,0,0.5)]">
          {suggestions.length > 0 &&
            suggestions.map((tech) => (
              <li
                onClick={() => addStack(tech)}
                className="cursor-pointer text-[16px] leading-5 font-bold hover:bg-gray-100"
                key={tech.id}
              >
                {tech.name}
              </li>
            ))}
          <li
            onClick={handleCreateClick}
            className="text-secondary-indigo cursor-pointer text-[16px] leading-5 font-semibold"
          >
            + Add New Item
          </li>
        </ul>
      )}
    </div>
  );
}
