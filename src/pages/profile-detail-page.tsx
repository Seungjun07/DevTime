import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDebounce } from "../hooks/use-debounce";
import TechStackInput from "../features/user/components/tech-stack/TechStackInput";
import TechStackList from "../features/user/components/tech-stack/TechStackList";
import { useCreateTechStack } from "../features/user/hooks/mutations/useCreateTechStack";
import { useTechStackQuery } from "../features/user/hooks/queries/useTechStackQuery";
import { useTechStackSelector } from "../features/user/hooks/useTechStackSelector";
import CareerSelect from "../features/user/components/form/CareerSelect";
import StudyGoalField from "../features/user/components/form/StudyGoalField";
import StudyPurposeSelect from "../features/user/components/form/StudyPurposeSelect";
import { useCreateProfile } from "../features/user/hooks/mutations/useCreateProfile";
import type {
  Career,
  Purpose,
  PurposeOption,
} from "../features/user/types/profile";
import ProfileImage from "../features/user/components/profile/ProfileImage";

export default function ProfileDetailPage() {
  const navigate = useNavigate();

  // profile
  // const { form, setForm, isValid, toProfile } = useProfileForm();
  const { mutate: createProfile } = useCreateProfile();

  // tech-stack
  const { keyword, selected, setKeyword, addStack, deleteStack } =
    useTechStackSelector();

  const debouncedKeyword = useDebounce(keyword);

  const { data: suggestions = [] } = useTechStackQuery(debouncedKeyword);
  const { mutate: createTechStack } = useCreateTechStack({
    onSuccess: addStack,
  });

  // profile state
  const [career, setCareer] = useState<Career | "">("");
  const [purposeSelect, setPurposeSelect] = useState<PurposeOption | "">("");
  const [purposeDetail, setPurposeDetail] = useState("");
  const [goal, setGoal] = useState("");
  const [profileImageKey, setProfileImageKey] = useState<string | null>(null);

  // 버튼 disabled
  const isFormValid =
    career &&
    goal &&
    purposeSelect &&
    (purposeSelect !== "기타" || purposeDetail.trim()) &&
    selected.length > 0 &&
    profileImageKey;

  function handleCreateTechStack() {
    if (!keyword.trim()) return;
    createTechStack(keyword);
  }

  const handleSave = () => {
    if (!career || !goal || !profileImageKey || !purposeSelect) return;

    const purpose: Purpose =
      purposeSelect === "기타"
        ? {
            type: "기타",
            detail: purposeDetail,
          }
        : purposeSelect;

    createProfile({
      career,
      purpose,
      goal,
      techStacks: selected.map((stack) => stack.name), // 이름 배열
      profileImage: profileImageKey,
    });

    navigate("/");
  };

  return (
    <div className="m-auto flex h-[790px] w-[420px] flex-1 flex-col items-center gap-10">
      <div className="text-primary-blue text-2xl leading-[30px] font-bold">
        프로필 설정
      </div>

      <CareerSelect value={career} onChange={setCareer} />
      <StudyPurposeSelect
        selectValue={purposeSelect}
        detailValue={purposeDetail}
        onSelectChange={(value) => setPurposeSelect(value)}
        onDetailChange={(value) => setPurposeDetail(value)}
      />
      {/* <StudyPurPoseSelect
        selectValue={purposeSelect}
        detailValue={purposeDetail}
        onSelectChange={(value) => setPurposeSelect(value)}
        onDetailChange={(value) => setPurposeDetail(value)}
        className="w-105"
      /> */}

      <StudyGoalField value={goal} onChange={setGoal} />

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
        disabled={!isFormValid}
        className={`${!isFormValid ? "bg-disabled-400 text-disabled-300" : "bg-primary-blue text-white"} h-12 w-105 cursor-pointer rounded px-4 py-3 text-lg leading-[22px] font-semibold`}
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
