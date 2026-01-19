import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CareerSelect from "../components/form/career-select";
import StudyPurPoseSelect from "../components/form/study-purpose-select";
import TextField from "../components/common/TextField/TextField";
import StudyGoalInput from "../components/form/study-goal-input";
import ProfileImage from "../components/profile/profile-image";
import TechStackInput from "../features/tech-stack/components/TechStackInput";
import TechStackList from "../features/tech-stack/components/TechStackList";
import { useDebounce } from "../hooks/use-debounce";
import { useTechStackQuery } from "../features/tech-stack/hooks/queries/useTechStackQuery";
import { useCreateProfile } from "../features/profile/hooks/mutations/useCreateProfile";
import { useTechStackSelector } from "../features/tech-stack/hooks/useTechStackSelector";
import { useCreateTechStack } from "../hooks/mutations/tech-stacks/use-create-tech-stacks";
import type {
  Career,
  Purpose,
  PurposeEnum,
} from "../features/profile/types/types";

export default function ProfileDetailPage() {
  const navigate = useNavigate();

  // profile
  // const { form, setForm, isValid, toProfile } = useProfileForm();

  // tech-stack
  const { keyword, selected, setKeyword, addStack, deleteStack } =
    useTechStackSelector();

  const debouncedKeyword = useDebounce(keyword);

  const { data: suggestions = [] } = useTechStackQuery(debouncedKeyword);
  const { mutate: createTechStack } = useCreateTechStack({
    onSuccess: addStack,
  });

  // image file
  const [profileImageKey, setProfileImageKey] = useState<string | null>(null);

  const { mutate: createProfile } = useCreateProfile();

  const [profileForm, setProfileForm] = useState({
    career: "",
    purpose: "",
    goal: "",
  });

  const [purposeSelect, setPurposeSelect] = useState("");
  const [purposeDetail, setPurposeDetail] = useState("");

  function handleCreateTechStack() {
    if (!keyword.trim()) return;
    createTechStack(keyword);
  }

  // 이미지 파일 업로드
  const isFormValid =
    profileForm.career &&
    profileForm.goal &&
    profileForm.purpose &&
    selected.length > 0 &&
    profileImageKey;

  const handleSave = () => {
    if (!profileImageKey) {
      alert("업로드할 파일을 선택해주세요.");
      return;
    }
    try {
      const purpose: Purpose =
        profileForm.purpose === "기타"
          ? {
              type: "기타",
              detail: purposeDetail,
            }
          : (purposeSelect as PurposeEnum);

      createProfile({
        career: profileForm.career as Career,
        purpose,
        goal: profileForm.goal,
        techStacks: selected.map((stack) => stack.name), // 이름 배열
        profileImage: profileImageKey,
      });

      navigate("/");
    } catch (error) {
      console.error("업로드 중 오류 발생", error);
    }
  };
  const disabled = !isFormValid;

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
      />
      <StudyPurPoseSelect
        selectValue={purposeSelect}
        detailValue={purposeDetail}
        onSelectChange={(value) => setPurposeSelect(value)}
        onDetailChange={(value) => setPurposeDetail(value)}
        className="w-105"
      />

      <TextField id="studyGoal">
        <TextField.Label>공부 목표</TextField.Label>
        <TextField.Input
          value={profileForm.goal}
          onChange={(e) =>
            setProfileForm((prev) => ({ ...prev, goal: e.target.value }))
          }
          id="studyGoal"
          placeholder="공부 목표를 입력해 주세요."
          // variant={"default"}
        />
      </TextField>

      <div className="flex w-105 flex-col gap-4">
        <TechStackInput
          value={keyword}
          suggestions={suggestions}
          onChange={setKeyword}
          onSelect={addStack}
          onCreate={handleCreateTechStack}
        />
        <TechStackList techStacks={selected} onDelete={deleteStack} />
      </div>

      <ProfileImage onUploadComplete={setProfileImageKey} />

      <button
        onClick={handleSave}
        disabled={disabled}
        className={`${disabled ? "bg-disabled-400 text-disabled-300" : "bg-primary-blue text-white"} h-12 w-105 cursor-pointer rounded px-4 py-3 text-lg leading-[22px] font-semibold`}
      >
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
