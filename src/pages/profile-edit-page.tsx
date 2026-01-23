import { useEffect, useState } from "react";
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
import { useModalStore } from "../store/modals";
import { useUpdateProfile } from "../features/user/hooks/mutations/useUpdateProfile";
import { useNavigate } from "react-router-dom";

export default function ProfileEditPage() {
  const navigate = useNavigate();
  const { data: profile, isLoading: isProfileLoading } = useProfileQuery();

  const { openConfirmModal, openAlertModal } = useModalStore();

  // tech-stack
  const { keyword, selected, setKeyword, addStack, deleteStack } =
    useTechStackSelector();

  const debouncedKeyword = useDebounce(keyword);

  const { data: suggestions = [] } = useTechStackQuery(debouncedKeyword);
  const { mutate: createTechStack } = useCreateTechStack({
    onSuccess: addStack,
  });

  const [career, setCareer] = useState<Career | "">("");
  const [profileImageKey, setProfileImageKey] = useState<string | null>(null);
  const [profileForm, setProfileForm] = useState({
    nickname: "",
    purposeSelect: "" as PurposeOption | "",
    purposeDetail: "",
    goal: "",
    profileImage: null as string | null,
  });

  const [isNicknameChecked, setIsNicknameChecked] = useState({
    available: false,
    message: "",
  });
  const { refetch: refetchNickname } = useCheckNickname(profileForm.nickname);

  const [purposeSelect, setPurposeSelect] = useState<PurposeOption | "">("");
  const [purposeDetail, setPurposeDetail] = useState("");

  const { mutate: updateProfile } = useUpdateProfile({
    onSuccess: () => {
      openAlertModal({
        title: "변경 사항이 저장되었습니다.",
      });
    },
    onError: () => {
      openAlertModal({
        title: "변경 사항 저장에 실패하였습니다.",
      });
    },
  });

  useEffect(() => {
    if (!profile) return;

    const purpose = profile.profile.purpose;
    setProfileForm({
      nickname: profile.nickname,
      purposeSelect: typeof purpose === "string" ? purpose : purpose.type,
      purposeDetail: typeof purpose === "object" ? purpose.detail : "",
      goal: profile.profile.goal,
      profileImage: profile.profile.profileImage ?? null,
    });

    setCareer(profile.profile.career);

    if (typeof purpose === "string") {
      setPurposeSelect(purpose);
    } else {
      setPurposeSelect("기타");
      setPurposeDetail(purpose.detail);
    }
  }, [profile]);

  function handleConfirmSave() {
    openConfirmModal({
      title: "변경 사항을 저장하시겠습니까?",
      confirmText: "저장하기",
      onConfirm: handleSave,
    });
  }

  function handleSave() {
    console.log(profileForm.nickname);
    if (!purposeSelect || !career) return;

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
      techStacks: selected.map((stack) => stack.name),
      profileImage: profileImageKey,
    });
  }

  const preview = `${IMAGE_URL}/${profile?.profile?.profileImage}`;

  function handleCreateTechStack() {
    if (!keyword.trim()) return;
    createTechStack(keyword);
  }

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
                value={profileForm.nickname}
                onChange={(e) =>
                  setProfileForm((prev) => ({
                    ...prev,
                    nickname: e.target.value,
                  }))
                }
                className="h-11 flex-1 rounded-sm bg-gray-50 px-4 py-3 text-[16px] leading-5 font-medium placeholder:text-gray-600"
                placeholder={profileForm.nickname}
              />
              <Button onClick={handleCheckNickname} variant={"secondary"}>
                중복 확인
              </Button>
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
            onChange={setCareer}
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
        <Button variant={"tertiary"} size={"lg"} onClick={() => navigate(-1)}>
          취소
        </Button>
        <Button
          onClick={handleConfirmSave}
          disabled={!profileForm.goal || !career}
          variant={"primary"}
          size={"lg"}
        >
          변경 사항 저장하기
        </Button>
      </div>
    </div>
  );
}
