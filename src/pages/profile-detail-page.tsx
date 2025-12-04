import { Link, useNavigate } from "react-router-dom";
import StackItem from "../components/stack-item";
import { useState, type ChangeEvent } from "react";
import ProfileImage from "../components/profile/profile-image";
import { getAccessToken } from "../utils/token";
import type { TechStack } from "../types";
import { useCreateTechStack } from "../hooks/mutations/tech-stacks/use-create-tech-stacks";
import ProfileTechStack from "../components/profile/profile-tech-stack";
import CareerSelect from "../components/form/career-select";
import { useCreateProfile } from "../hooks/mutations/profile/use-create-profile";
import { useTechStack } from "../hooks/queries/use-tech-stack-data";
import { useDebounce } from "../hooks/use-debounce";
import { usePresignedUrl } from "../components/file/use-presigned-url";
import { uploadToS3 } from "../api/file";

export default function ProfileDetailPage() {
  const navigate = useNavigate();
  const [profileForm, setProfileForm] = useState({
    career: "",
    purpose: "",
    goal: "",
    profileImage: "",
  });

  const [keyword, setKeyword] = useState<string>("");
  const [selectedTechStacks, setSelectedTechStacks] = useState<TechStack[]>([]);

  const debouncedKeyword = useDebounce(keyword);
  const { data: suggestions = [], isLoading } = useTechStack(debouncedKeyword);

  const { mutate: createTechStack, isPending } = useCreateTechStack({
    onSuccess: (newStack) => {
      setSelectedTechStacks((prev) => [...prev, newStack]);
      setKeyword("");
    },
  });

  function handleCreateClick() {
    createTechStack(keyword);
  }

  function deleteStack(id: string) {
    setSelectedTechStacks((prev) => prev.filter((stack) => stack.id !== id));
  }

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { mutateAsync: getPresignedUrl } = usePresignedUrl();
  const { mutateAsync: createProfile, isPending: isCreateProfilePending } =
    useCreateProfile({ onSuccess: () => {} });

  const handleSave = async () => {
    if (!file) {
      alert("업로드할 파일을 선택해주세요.");
      return;
    }
    setUploading(true);
    try {
      const { presignedUrl, key } = await getPresignedUrl(file);
      console.log("1. URL 발급 완료");

      await uploadToS3(file, presignedUrl);
      console.log("2. S3 업로드 완료");

      await createProfile({
        career: profileForm.career || "",
        purpose: profileForm.purpose || "",
        goal: profileForm.goal || "",
        techStacks: selectedTechStacks.map((stack) => stack.name), // 이름 배열
        profileImage: key || "",
      });

      setFile(null);
      navigate("/");
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
  }

  return (
    <div className="m-auto flex h-[790px] w-[420px] flex-1 flex-col items-center gap-10">
      <div className="text-primary-blue text-2xl leading-[30px] font-bold">
        프로필 설정
      </div>

      <CareerSelect
        value={profileForm.career}
        onChange={(value) =>
          setProfileForm((prev) => ({ ...prev, career: value }))
        }
        className="w-105"
      />

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

      <ProfileImage onFileSelect={(file) => setFile(file)} />

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
