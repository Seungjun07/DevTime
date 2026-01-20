import { useState } from "react";
import type { PurposeEnum } from "../../../types";
import type { ProfileForm, Purpose, Career } from "../types/types";

export function useProfileForm() {
  const [form, setForm] = useState<ProfileForm>({
    career: "",
    purposeSelect: "",
    purposeDetail: "",
    goal: "",
    techStacks: [],
    profileImage: "",
  });

  const isPurposeValid =
    form.purposeSelect &&
    (form.purposeSelect !== "기타" || !!form.purposeDetail.trim());

  const isValid =
    !!form.career &&
    !!form.goal &&
    form.techStacks.length > 0 &&
    !!form.profileImage &&
    isPurposeValid;

  function toProfile() {
    const purpose: Purpose =
      form.purposeSelect === "기타"
        ? {
            type: "기타",
            detail: form.purposeDetail,
          }
        : (form.purposeSelect as PurposeEnum);

    return {
      career: form.career as Career,
      purpose,
      goal: form.goal,
      techStacks: form.techStacks,
      profileImage: form.profileImage,
    };
  }

  return { form, setForm, toProfile, isValid };
}
