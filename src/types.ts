export interface LoginData {
  accessToken: string;
  isDuplicateLogin: boolean;
  isFirstLogin: boolean;
  message: string;
  refreshToken: string;
  success: boolean;
}

export interface Profile {
  career: string; // 개발 경력 (년수)
  purpose: string; // 공부 목적
  imageUrl?: string | null; // 프로필 이미지 (없을 수도 있음)
  techStacks: TechStack[]; // 사용 기술 스택
  profileImage?: string | null;
}

export interface RankingItem {
  userId: number;
  nickname: string;
  averageStudyTime: number; // 하루 평균 공부 시간
  totalStudyTime: number; // 전체 공부 시간
  rank: number; // 랭킹
  profile: Profile; // 프로필 정보 객체
}

export interface TechStack {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SplitTime {
  date: string;
  timeSpent: number;
}

export interface TimerPayLoad {
  timerId: string;
  splitTimes: SplitTime[];
}

export interface Task {
  id: string;
  content: string;
  isCompleted: boolean;
}

export interface TaskResponse {
  task: Task[];
}

export type TaskModalType = "CREATE" | "EDIT" | "FINISH" | "UPDATE";

export interface MyProfile {
  email: string;
  nickname: string;
  profile?: {
    career: string;
    goal: string;
    profileImage: string;
    purpose: Purpose;
    techStacks: string[];
  };
}
export type PurposeEnum =
  | "취업 준비"
  | "이직 준비"
  | "단순 개발 역량 향상"
  | "회사 내 프로젝트 원활하게 수행";

type PurposeObject = {
  type: "기타";
  detail: string;
};

export type Purpose = PurposeEnum | PurposeObject;

export interface ProfileForm {
  nickname: string;
  career: string;
  goal: string;
  profileImage: string;
  purpose: Purpose;
  techStacks: string[];
}
