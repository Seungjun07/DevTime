import { useEffect, useState } from "react";
import ProfileImage from "../components/profile/profile-image";
import StackItem from "../components/stack-item";
import { type Purpose, type PurposeEnum, type TechStack } from "../types";
import { useProfileData } from "../hooks/queries/use-profile-data";
import { useCreateTechStack } from "../hooks/mutations/tech-stacks/use-create-tech-stacks";
import CareerSelect from "../components/form/career-select";
import { useUpdateProfile } from "../hooks/mutations/profile/use-update-profile";
import StudyPurPoseSelect from "../components/form/study-purpose-select";
import StudyGoalInput from "../components/form/study-goal-input";
import ProfileTechStack from "../components/profile/profile-tech-stack";
import { useDebounce } from "../hooks/use-debounce";
import { useTechStack } from "../hooks/queries/use-tech-stack-data";
import { useCheckNickname } from "../hooks/queries/use-check-nickname";
import { IMAGE_URL } from "../constant";

export default function ProfileEditPage() {
  const { data: profile, isLoading: isProfileLoading } = useProfileData();

  const [profileForm, setProfileForm] = useState({
    nickname: "",
    career: "",
    purpose: null,
    goal: "",
    techStacks: [] as string[], // 이름 배열
    profileImage: "", // key가 아직 없으면 빈 문자열
  });

  const [purposeSelect, setPurposeSelect] = useState("");
  const [purposeDetail, setPurposeDetail] = useState("");

  const { mutate: updateProfile, isPending: isUpdateProfilePending } =
    useUpdateProfile({
      onSuccess: () => {
        alert("저장 완료");
      },
    });

  useEffect(() => {
    if (!profile) return;

    const profilePurpose = profile.profile?.purpose;
    if (typeof profilePurpose === "string") {
      setPurposeSelect(profilePurpose);
      setPurposeDetail("");
    } else {
      setPurposeSelect("기타");
      setPurposeDetail(profilePurpose?.detail || "");
    }
    setProfileForm({
      nickname: profile.nickname,
      career: profile?.profile?.career,
      // purpose: purposeSelect,
      goal: profile?.profile?.goal,
      techStacks: profile?.profile?.techStacks ?? [],
      profileImage: profile?.profile?.profileImage,
    });
  }, [profile]);

  function handleSave() {
    let purpose: Purpose;

    if (purposeSelect === "기타") {
      purpose = { type: "기타", detail: purposeDetail };
    } else {
      purpose = purposeSelect as PurposeEnum;
    }

    updateProfile({
      nickname: profileForm.nickname,
      career: profileForm.career,
      purpose: purpose,
      goal: profileForm.goal,
      techStacks: profileForm.techStacks,
      profileImage: profileForm.profileImage,
    });
  }

  function handleCreateClick() {
    createTechStack(keyword);
  }

  const preview = `${IMAGE_URL}/${profile?.profile?.profileImage}`;

  function deleteStack(id: string) {
    setSelectedTechStacks((prev) => prev.filter((stack) => stack.id !== id));
  }

  const [keyword, setKeyword] = useState<string>("");
  const [selectedTechStacks, setSelectedTechStacks] = useState<TechStack[]>([]);

  const debouncedKeyword = useDebounce(keyword);
  const { data: suggestions = [] } = useTechStack(debouncedKeyword);

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

  const [isNicknameChecked, setIsNicknameChecked] = useState({
    available: false,
    message: "",
  });

  const {
    // data: checkedNickname,
    isLoading,
    refetch,
  } = useCheckNickname(profileForm.nickname);

  async function handleCheckNickname() {
    const { data } = await refetch();

    setIsNicknameChecked(data);
  }
  if (isProfileLoading) return <div>로딩 중...</div>;

  return (
    <div className="flex flex-col gap-9 rounded-xl bg-white p-9">
      <ProfileImage defaultImage={preview} />

      <div className="flex gap-18">
        <div className="flex flex-1 flex-col gap-6">
          {/* 닉네임 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="nickname"
              className="text-sm leading-[18px] font-medium text-gray-600"
            >
              닉네임
            </label>
            <div className="flex gap-3">
              <input
                id="nickname"
                onChange={(e) =>
                  setProfileForm((prev) => ({
                    ...prev,
                    nickname: e.target.value,
                  }))
                }
                className="h-11 flex-1 rounded-sm bg-gray-50 px-4 py-3 text-[16px] leading-5 font-medium placeholder:text-gray-600"
                placeholder={profileForm.nickname}
              />
              <button
                onClick={handleCheckNickname}
                className="bg-disabled-200 text-disabled-400 h-11 px-4 py-3 text-sm leading-[18px] font-semibold"
              >
                중복 확인
              </button>
            </div>
            {<p>{isNicknameChecked.message}</p>}
          </div>

          <StudyPurPoseSelect
            selectValue={purposeSelect}
            detailValue={purposeDetail}
            onSelectChange={(value) => setPurposeSelect(value)}
            onDetailChange={(value) => setPurposeDetail(value)}
          />

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
                className="placeholder-custom w-full rounded bg-gray-50 px-4 py-3"
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
                className="placeholder-custom w-full rounded bg-gray-50 px-4 py-3"
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
        <div className="flex flex-1 flex-col gap-6">
          <CareerSelect
            value={profileForm.career}
            onChange={(value) =>
              setProfileForm((prev) => ({ ...prev, career: value }))
            }
          />

          <StudyGoalInput
            value={profileForm.goal}
            onChange={(value) =>
              setProfileForm((prev) => ({ ...prev, goal: value }))
            }
          />

          <div className="flex flex-col gap-4">
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
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button className="text-primary-blue h-12 rounded bg-gray-50 px-4 py-3 text-[18px] leading-[22px] font-semibold">
          취소
        </button>
        <button
          onClick={handleSave}
          className="bg-disabled-400 text-disabled-300 h-12 rounded px-4 py-3 text-[18px] leading-[22px] font-semibold"
        >
          변경 사항 저장하기
        </button>
      </div>
    </div>
  );
}
