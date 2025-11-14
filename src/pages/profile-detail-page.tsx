import { Link } from "react-router-dom";
import StackItem from "../components/stack-item";
import { useEffect, useState } from "react";
import ProfileImage from "../components/profile/profile-image";

type TechStack = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export default function ProfileDetailPage() {
  const [profileForm, setProfileForm] = useState({
    career: "",
    purpose: "",
    goal: "",
    techStacks: [],
    profileImage: "",
  });

  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<TechStack[]>([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState<TechStack[]>([]);

  useEffect(() => {
    if (!keyword) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const tokenObj = JSON.parse(localStorage.getItem("token") || "{}");
        const accessToken = tokenObj.accessToken;

        if (!accessToken) {
          console.log("로그인 필요");
          return;
        }
        const response = await fetch(
          `https://devtime.prokit.app/api/tech-stacks?keyword=${keyword}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (!response.ok) throw new Error("기술 스택 불러오기 실패");
        const data = await response.json();

        setSuggestions(data.results || []);

        console.log(suggestions);
      } catch (error) {
        console.log(error);
      }
    }, 300); // 0.3초 딜레이

    return () => clearTimeout(delayDebounce);
  }, [keyword]);

  async function createProfile() {
    const tokenObj = JSON.parse(localStorage.getItem("token") || "{}");
    const accessToken = tokenObj.accessToken;

    if (!accessToken) {
      console.log("로그인 필요");
      return;
    }

    try {
      const response = await fetch(`https://devtime.prokit.app/api/profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          career: profileForm.career,
          purpose: profileForm.purpose,
          goal: profileForm.goal,
          techStacks: [...profileForm.techStacks],
          profileImage: profileForm.profileImage,
        }),
      });

      if (!response.ok) throw new Error("프로필 생성 실패");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

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
            value={profileForm.purpose}
            onChange={(e) =>
              setProfileForm((prev) => ({ ...prev, purpose: e.target.value }))
            }
            id="studyPurpose"
            className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3"
          >
            <option value={""}>공부의 목적을 선택해 주세요.</option>
            <option value={"job_preparation"}>취업 준비</option>
            <option value={"career_change"}>이직 준비</option>
            <option value={"skill_improvement"}>단순 개발 역량 향상</option>
            <option value={"project_support"}>
              회사 내 프로젝트 원활하게 수행
            </option>
            <option value={"other"}>기타(직접 입력)</option>
          </select>
          {profileForm.purpose === "other" && (
            <input
              className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3"
              placeholder="직접 입력"
              value={profileForm.purpose}
              onChange={(e) =>
                setProfileForm((prev) => ({ ...prev, purpose: e.target.value }))
              }
            />
          )}
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
            value={profileForm.goal}
            onChange={(e) =>
              setProfileForm((prev) => ({
                ...prev,
                goal: e.target.value,
              }))
            }
            id="studyGoal"
            className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3"
            placeholder="공부 목표를 입력해 주세요."
          />
        </div>
      </div>

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
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3"
              placeholder="기술 스택을 검색해 등록해 주세요."
            />
          </div>
          {suggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-y-auto rounded border bg-white shadow">
              {suggestions.map((tech) => (
                <li
                  className="cursor-pointer bg-blue-500 p-2 hover:bg-gray-100"
                  key={tech.id}
                >
                  {tech.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-wrap gap-2"></div>
      </div>

      <ProfileImage />
      {/* <div className="h-[70px]">
        <label
          htmlFor="profileImage"
          className="text-[14px] leading-[18px] font-medium text-gray-600"
        >
          프로필 이미지
        </label>
        <div>
          <input
            id="profileImage"
            className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3"
            placeholder="기술 스택을 검색해 등록해 주세요."
          />
        </div>
      </div> */}

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
