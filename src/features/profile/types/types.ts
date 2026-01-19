export interface Profile {
  career: Career;
  purpose: Purpose;
  goal?: string;
  techStacks: string[]; // 사용 기술 스택
  profileImage?: string | null;
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

export type PurposeEnum =
  | "취업 준비"
  | "이직 준비"
  | "단순 개발 역량 향상"
  | "회사 내 프로젝트 원활하게 수행";

export type Purpose = PurposeEnum | { type: "기타"; detail: string };

export type Career =
  | "경력 없음"
  | "0 - 3년"
  | "4 - 7년"
  | "8 - 10년"
  | "11년 이상";

export type CareerFormValue = Career | "";
// export type Pur
