import { useEffect, useState } from "react";
import ProfileImage from "../components/profile/profile-image";
import StackItem from "../components/stack-item";
import { getAccessToken } from "../utils/token";
import { type MyProfile, type TechStack } from "../types";
import { useProfileData } from "../hooks/queries/use-profile-data";
import { useCreateTechStack } from "../hooks/mutations/tech-stacks/use-create-tech-stacks";

export default function ProfileEditPage() {
  const { data: profile, isLoading } = useProfileData();

  const [keyword, setKeyword] = useState<string>("");
  const [suggestions, setSuggestions] = useState<TechStack[]>([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState<TechStack[]>([]);

  useEffect(() => {
    if (!keyword) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const accessToken = getAccessToken();

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

  const { mutate: createTechStack, isPending } = useCreateTechStack({
    onSuccess: (newStack) => {
      setSelectedTechStacks((prev) => [...prev, newStack]);
      setKeyword("");
      setSuggestions([]);
    },
  });

  function handleCreateClick() {
    createTechStack(keyword);
  }
  // async function createNewStack() {
  //   try {
  //     const accessToken = getAccessToken();

  //     if (!accessToken) throw new Error("토큰 만료 - 로그인 실패");

  //     console.log(typeof keyword);
  //     const response = await fetch(
  //       "https://devtime.prokit.app/api/tech-stacks",
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ name: keyword }),
  //       },
  //     );

  //     if (!response.ok) throw new Error("기술 스택 생성 실패");
  //     const data = await response.json();
  //     console.log(data);
  //     setSelectedTechStacks((prev) => [...prev, data.techStack]);
  //     setKeyword("");
  //     setSuggestions([]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  function deleteStack(id: string) {
    setSelectedTechStacks((prev) => prev.filter((stack) => stack.id !== id));
  }

  return (
    <div className="flex flex-col gap-9 rounded-xl bg-white p-9">
      {/* <ProfileImage /> */}

      <div className="flex gap-18">
        <div className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="nickname"
              className="text-sm leading-[18px] font-medium text-gray-600"
            >
              닉네임
            </label>
            <div className="flex gap-3">
              <input
                id="nickname"
                className="h-11 rounded bg-gray-50 px-4 py-3"
                placeholder={profile?.nickname}
              />
              <button className="bg-disabled-200 h-11 px-4 py-3">
                중복 확인
              </button>
            </div>
            <p>이메일 형식</p>
          </div>

          <div className="mb-6 h-[70px]">
            <label
              htmlFor="studyPurpose"
              className="text-sm leading-[18px] font-medium text-gray-600"
            >
              공부 목적
            </label>
            <div>
              <select
                id="studyPurpose"
                className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3"
              >
                <option value={""}>공부의 목적을 선택해 주세요.</option>
                <option value={"취업 준비"}>취업 준비</option>
                <option value={"이직 준비"}>이직 준비</option>
                <option value={"단순 개발 역량 향상"}>
                  단순 개발 역량 향상
                </option>
                <option value={"회사 내 프로젝트 원활하게 수행"}>
                  회사 내 프로젝트 원활하게 수행
                </option>
                <option value={"기타"}>기타(직접 입력)</option>
              </select>
              {/* <input
                className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3"
                placeholder="기타 "
              /> */}
            </div>
          </div>

          <div className="h-[70px]">
            <label
              htmlFor="password"
              className="text-sm leading-[18px] font-medium text-gray-600"
            >
              새 비밀번호
            </label>
            <div>
              <input
                id="password"
                className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3"
                type="password"
                placeholder="비밀번호를 입력해 주세요."
              />
              {/* {errors.password && (
            <p className="text-secondary-negative pt-2 text-[12px] leading-4 font-medium">
              {errors.password}
            </p>
          )} */}
            </div>
          </div>

          <div className="h-[70px]">
            <label
              htmlFor="confirmPassword"
              className="text-[14px] leading-[18px] font-medium text-gray-600"
            >
              새 비밀번호 재입력
            </label>
            <div>
              <input
                id="confirmPassword"
                className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3"
                type="password"
                placeholder="비밀번호를 한 번 더 입력해 주세요."
              />
              {/* {errors.password && (
            <p className="text-secondary-negative pt-2 text-[12px] leading-4 font-medium">
              {errors.password}
            </p>
          )} */}
            </div>
          </div>
        </div>

        {/* 오른쪽 박스 */}
        <div className="flex flex-col gap-6">
          <div className="">
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

          <div>
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
                placeholder={
                  profile?.profile?.purpose
                    ? `${profile?.profile.purpose}`
                    : "공부 목표를 입력해 주세요."
                }
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
              <div>
                <input
                  id="studyStack"
                  className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3"
                  placeholder="기술 스택을 검색해 등록해 주세요."
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <StackItem
                techStacks={selectedTechStacks}
                deleteStack={deleteStack}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button className="text-primary-blue h-12 rounded bg-gray-50 px-4 py-3 text-[18px] leading-[22px] font-semibold">
          취소
        </button>
        <button className="bg-disabled-400 text-disabled-300 h-12 rounded px-4 py-3 text-[18px] leading-[22px] font-semibold">
          변경 사항 저장하기
        </button>
      </div>
    </div>
  );
}
