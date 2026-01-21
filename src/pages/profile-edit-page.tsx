import { useEffect, useState } from "react";
import { useUpdateProfile } from "../hooks/mutations/profile/use-update-profile";
import { useDebounce } from "../hooks/use-debounce";
import { useProfileQuery } from "../features/user/hooks/queries/useProfileQuery";
import Button from "../components/common/Button";
import { useCheckNickname } from "../features/signup/hooks/queryies/useSignUpQueries";

import TechStackInput from "../features/user/components/tech-stack/TechStackInput";
import TechStackList from "../features/user/components/tech-stack/TechStackList";
import { useCreateTechStack } from "../features/user/hooks/mutations/useCreateTechStack";
import { useTechStackQuery } from "../features/user/hooks/queries/useTechStackQuery";
import { useTechStackSelector } from "../features/user/hooks/useTechStackSelector";
import CareerSelect from "../features/user/components/form/CareerSelect";
import StudyGoalField from "../features/user/components/form/StudyGoalField";
import StudyPurposeSelect from "../features/user/components/form/StudyPurposeSelect";
import type {
  Career,
  Purpose,
  PurposeOption,
} from "../features/user/types/types";
import ProfileImage from "../features/user/components/profile/ProfileImage";
import { IMAGE_URL } from "../api/api";

export default function ProfileEditPage() {
  const { data: profile, isLoading: isProfileLoading } = useProfileQuery();
  // const { data: profile, isLoading: isProfileLoading } = useProfileData();

  // tech-stack
  const { keyword, selected, setKeyword, addStack, deleteStack } =
    useTechStackSelector();

  const debouncedKeyword = useDebounce(keyword);

  const { data: suggestions = [] } = useTechStackQuery(debouncedKeyword);
  const { mutate: createTechStack } = useCreateTechStack({
    onSuccess: addStack,
  });
  const [profileImageKey, setProfileImageKey] = useState<string | null>(null);

  const [career, setCareer] = useState<Career | "">("");

  const [profileForm, setProfileForm] = useState({
    nickname: "",
    goal: "",
    techStacks: [] as string[], // 이름 배열
    profileImage: "", // key가 아직 없으면 빈 문자열
  });

  const [purposeSelect, setPurposeSelect] = useState<PurposeOption | "">("");
  const [purposeDetail, setPurposeDetail] = useState("");

  const { mutate: updateProfile, isPending: isUpdateProfilePending } =
    useUpdateProfile({
      onSuccess: () => {
        alert("저장 완료");
      },
    });

  useEffect(() => {
    if (!profile) return;

    setProfileForm((prev) => ({
      ...prev,
      nickname: profile.nickname,
      career: profile?.profile?.career ?? "",
      // purpose: purposeSelect,
      goal: profile?.profile?.goal ?? "",
      techStacks: profile?.profile?.techStacks ?? [],
      profileImage: profile?.profile?.profileImage ?? "",
    }));
  }, [profile]);

  function handleSave() {
    if (!purposeSelect) return;

    const purpose: Purpose =
      purposeSelect === "기타"
        ? {
            type: "기타",
            detail: purposeDetail,
          }
        : purposeSelect;

    updateProfile({
      nickname: profileForm.nickname,
      career: career,
      purpose,
      goal: profileForm.goal,
      techStacks: profileForm.techStacks,
      profileImage: profileForm.profileImage,
    });
  }

  const preview = `${IMAGE_URL}/${profile?.profile?.profileImage}`;

  function handleCreateTechStack() {
    if (!keyword.trim()) return;
    createTechStack(keyword);
  }

  const [isNicknameChecked, setIsNicknameChecked] = useState({
    available: false,
    message: "",
  });

  const { refetch: refetchNickname } = useCheckNickname(profileForm.nickname);

  async function handleCheckNickname() {
    const { data } = await refetchNickname();

    if (data)
      setIsNicknameChecked({
        available: data.available,
        message: data.message,
      });
  }

  useEffect(() => {
    setIsNicknameChecked({ available: false, message: "" });
  }, [profileForm.nickname]);

  if (isProfileLoading) return <div>로딩 중...</div>;

  return (
    <div className="flex flex-col gap-9 rounded-xl bg-white p-9">
      <ProfileImage
        defaultImage={preview}
        onUploadComplete={setProfileImageKey}
      />

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

          <StudyPurposeSelect
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
            value={career}
            onChange={(value) =>
              setProfileForm((prev) => ({ ...prev, career: value }))
            }
            className="w-full"
          />

          <StudyGoalField
            value={profileForm.goal}
            onChange={(value) =>
              setProfileForm((prev) => ({ ...prev, goal: value }))
            }
          />

          <div className="flex flex-col gap-4">
            <TechStackInput
              value={keyword}
              suggestions={suggestions}
              onChange={setKeyword}
              onSelect={addStack}
              onCreate={handleCreateTechStack}
              className="w-full"
            />
            <TechStackList techStacks={selected} onDelete={deleteStack} />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant={"tertiary"} size={"lg"}>
          취소
        </Button>
        <Button
          onClick={handleSave}
          disabled={!profileForm.goal}
          variant={"primary"}
          size={"lg"}
        >
          변경 사항 저장하기
        </Button>
      </div>
    </div>
  );
}
