import { Link, useNavigate } from "react-router-dom";
import StackItem from "../components/stack-item";
import { useState, type ChangeEvent } from "react";
import ProfileImage from "../components/profile/profile-image";
import { type PurposeEnum, type Purpose, type TechStack } from "../types";
import { useCreateTechStack } from "../hooks/mutations/tech-stacks/use-create-tech-stacks";
import ProfileTechStack from "../components/profile/profile-tech-stack";
import CareerSelect from "../components/form/career-select";
import { useCreateProfile } from "../hooks/mutations/profile/use-create-profile";
import { useTechStack } from "../hooks/queries/use-tech-stack-data";
import { useDebounce } from "../hooks/use-debounce";
import { usePresignedUrl } from "../components/file/use-presigned-url";
import { uploadToS3 } from "../api/file";
import StudyPurPoseSelect from "../components/form/study-purpose-select";
import StudyGoalInput from "../components/form/study-goal-input";
import TextField from "../components/common/TextField/TextField";
import TextFieldInput from "../components/common/TextField/TextFieldInput";

export default function ProfileDetailPage() {
  const navigate = useNavigate();
  const [profileForm, setProfileForm] = useState({
    career: "",
    purpose: "",
    goal: "",
    profileImage: "",
  });

  const [purposeSelect, setPurposeSelect] = useState("");
  const [purposeDetail, setPurposeDetail] = useState("");

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

  function addStack(stack: TechStack) {
    const exists = selectedTechStacks.some((item) => item.id === stack.id);

    if (!exists) {
      setSelectedTechStacks((prev) => [...prev, stack]);
    }

    setKeyword("");
  }

  function handleCreateClick() {
    createTechStack(keyword);
  }

  function deleteStack(id: string) {
    setSelectedTechStacks((prev) => prev.filter((stack) => stack.id !== id));
  }

  // 이미지 파일 업로드
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { mutateAsync: getPresignedUrl } = usePresignedUrl();
  const { mutateAsync: createProfile, isPending: isCreateProfilePending } =
    useCreateProfile({ onSuccess: () => {} });

  const isFormValid =
    profileForm.career &&
    profileForm.goal &&
    selectedTechStacks.length > 0 &&
    file;

  const handleSave = async () => {
    if (!file) {
      alert("업로드할 파일을 선택해주세요.");
      return;
    }
    setUploading(true);
    try {
      let purpose: Purpose;

      if (purposeSelect === "기타") {
        purpose = { type: "기타", detail: purposeDetail };
      } else {
        purpose = purposeSelect as PurposeEnum;
      }

      const { presignedUrl, key } = await getPresignedUrl(file);

      await uploadToS3(file, presignedUrl);

      await createProfile({
        career: profileForm.career || "",
        purpose: purpose,
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
  const disabled = !profileForm || selectedTechStacks.length === 0 || !file;

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
      <StudyPurPoseSelect
        selectValue={purposeSelect}
        detailValue={purposeDetail}
        onSelectChange={(value) => setPurposeSelect(value)}
        onDetailChange={(value) => setPurposeDetail(value)}
        className="w-105"
      />

      <TextField label="공부 목표" htmlFor="studyGoal">
        <TextFieldInput
          value={profileForm.goal}
          onChange={(e) =>
            setProfileForm((prev) => ({ ...prev, goal: e.target.value }))
          }
          id="studyGoal"
          placeholder="공부 목표를 입력해 주세요."
          variant={"default"}
        />
      </TextField>

      <div className="flex w-105 flex-col gap-4">
        <ProfileTechStack
          value={keyword}
          onChange={(value) => setKeyword(value)}
          onAdd={(value) => addStack(value)}
          onCreate={handleCreateClick}
          suggestions={suggestions}
        />

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
        disabled={!isFormValid}
        className={`${disabled ? "bg-disabled-400 text-disabled-300" : "bg-primary-blue text-white"} h-12 w-105 cursor-pointer rounded px-4 py-3 text-lg leading-[22px] font-semibold`}
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
