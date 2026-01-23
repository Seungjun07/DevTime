import type { Pagination } from "../../types";
import type { TechStack } from "../user/types/techStack";
import type { Profile } from "../user/types/types";

export interface RankingItem {
  rank: number;
  userId: string;
  nickname: string;
  totalStudyTime: number;
  averageStudyTime: number;
  profile: RankingProfile;
}

export type RankingProfile = Omit<Profile, "techStacks"> & {
  techStacks: TechStack[];
};

export interface RankingRequest {
  sortBy: string;
  page: number;
  limit: number;
}

export interface RankingResponse {
  success: boolean;
  data: {
    rankings: RankingItem[];
    pagination: Pagination;
  };
}
