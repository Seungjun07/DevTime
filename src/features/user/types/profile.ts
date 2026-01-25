import type { CAREER_OPTIONS, PURPOSE_OPTIONS } from "../constants";

export type Career = (typeof CAREER_OPTIONS)[number]["value"];

export type PurposeOption = (typeof PURPOSE_OPTIONS)[number]["value"];

export type Purpose =
  | Exclude<PurposeOption, "기타">
  | { type: "기타"; detail: string };

export interface Profile {
  career: Career | "";
  purpose: Purpose;
  goal: string;
  techStacks: string[]; // 사용 기술 스택
  profileImage: string | null;
}

export interface ProfileForm {
  career: Career | "";
  purposeSelect: Purpose | "기타" | "";
  purposeDetail: string;
  goal: string;
  techStacks: string[];
  profileImage: string | null;
}

export interface SuccessProfileResponse {
  success: boolean;
  message: string;
}

export interface FetchProfileResponse {
  email: string;
  nickname: string;
  profile: Profile;
}

export interface UpdateProfileRequest extends Profile {
  nickname: string;
  password?: string;
}

export type CareerFormValue = Career | "";
