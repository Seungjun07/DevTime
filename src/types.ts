export interface Profile {
  career: string; // 개발 경력 (년수)
  purpose: string; // 공부 목적
  imageUrl: string | null; // 프로필 이미지 (없을 수도 있음)
  techStacks: TechStack[]; // 사용 기술 스택
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

export interface MyProfile {
  email: string;
  nickname: string;
  profile: {
    career: string;
    goal: string;
    profileImage: string;
    purpose: string;
    techStacks: string[];
  };
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
