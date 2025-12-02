import { Link } from "react-router-dom";
import StackItem from "../components/stack-item";
import { useEffect, useState, type ChangeEvent } from "react";
import ProfileImage from "../components/profile/profile-image";
import { getAccessToken } from "../utils/token";
import { fetchWithAuth } from "../api/auth";
import type { TechStack } from "../types";
import { useCreateTechStack } from "../hooks/mutations/tech-stacks/use-create-tech-stacks";
import ProfileTechStack from "../components/profile/profile-tech-stack";

export default function ProfileDetailPage() {
  const [profileForm, setProfileForm] = useState({
    career: "",
    purpose: "",
    goal: "",
    profileImage: "",
  });

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

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const selectedFile = e.target.files[0];

    if (!["image/png", "image/jpeg"].includes(selectedFile.type)) {
      alert("png 또는 jpg 파일만 업로드 가능합니다.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("5MB 이하 파일만 업로드 가능합니다.");
      return;
    }

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(selectedFile);
  };

  async function getPresignedUrl(file: File) {
    const accessToken = getAccessToken();

    if (!accessToken) throw new Error("로그인 필요");
    if (!file) throw new Error("업로드할 파일이 없습니다.");

    const response = await fetch(
      `https://devtime.prokit.app/api/file/presigned-url`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
        }),
      },
    );

    if (!response.ok) throw new Error("이미지 요청 실패");

    const data = await response.json();

    console.log(data);
    return data; // {presignedUrl, key}
  }

  async function uploadToS3(file: File, presignedUrl: string) {
    console.log(presignedUrl, file.type);
    const response = await fetch(presignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!response.ok) {
      const text = await response.text();
      console.log(text);
      throw new Error("S3 업로드 실패");
    }
  }

  async function createProfile(key: string) {
    const accessToken = getAccessToken();

    if (!accessToken) {
      console.log("로그인 필요");
      return;
    }
    const body = {
      career: profileForm.career || "",
      purpose: profileForm.purpose || "",
      goal: profileForm.goal || "",
      techStacks: selectedTechStacks.map((stack) => stack.name), // 이름 배열
      profileImage: key || "", // key가 아직 없으면 빈 문자열
    };

    try {
      const response = await fetch(`https://devtime.prokit.app/api/profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      console.log(profileForm, key);

      const text = response.text();
      console.log(text);

      if (!response.ok) throw new Error("프로필 생성 실패");
      // const data = await response.json();
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSave = async () => {
    if (!file) {
      alert("업로드할 파일을 선택해주세요.");
      return;
    }
    setUploading(true);
    try {
      const { presignedUrl, key } = await getPresignedUrl(file);
      console.log("1. URL 발급 완료");

      // await uploadToS3(file, presignedUrl);
      console.log("2. S3 업로드 완료");

      await createProfile(key);

      setFile(null);
      setPreview(null);
    } catch (error) {
      console.error("업로드 중 오류 발생", error);
    } finally {
      setUploading(false);
    }
  };

  function addStack(name: TechStack) {
    if (!selectedTechStacks.includes(name)) {
      setSelectedTechStacks((prev) => [...prev, name]);
    }

    setKeyword("");
    setSuggestions([]);
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
            value={profileForm.career}
            onChange={(e) =>
              setProfileForm((prev) => ({ ...prev, career: e.target.value }))
            }
            id="developCareer"
            className="placeholder-custom w-105 rounded bg-gray-50 px-4 py-3"
          >
            <option value={""}>개발 경력을 선택해 주세요.</option>
            <option value={"경력 없음"}>경력 없음</option>
            <option value={"0 - 3년"}>0-3년</option>
            <option value={"4 - 7년"}>4-7년</option>
            <option value={"8 - 10년"}>8-10년</option>
            <option value={"11년 이상"}>11년 이상</option>
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
            <option value={"취업 준비"}>취업 준비</option>
            <option value={"이직 준비"}>이직 준비</option>
            <option value={"단순 개발 역량 향상"}>단순 개발 역량 향상</option>
            <option value={"회사 내 프로젝트 원활하게 수행"}>
              회사 내 프로젝트 원활하게 수행
            </option>
            <option value={"기타"}>기타(직접 입력)</option>
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

      <div className="flex w-105 flex-col gap-4">
        {/* <ProfileTechStack keyword={keyword} suggestions={suggestions} /> */}
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
        <div className="flex flex-wrap gap-2">
          <StackItem
            techStacks={selectedTechStacks}
            deleteStack={deleteStack}
          />
        </div>
      </div>

      <ProfileImage onChange={handleFileChange} preview={preview} />

      <button
        onClick={handleSave}
        className={`bg-disabled-400 text-disabled-300 h-12 w-105 cursor-pointer rounded px-4 py-3 text-lg leading-[22px] font-semibold`}
      >
        {uploading ? "업로드 중..." : "저장하기"}
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
