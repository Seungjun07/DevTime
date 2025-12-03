import type { RankingItem } from "../types";
import { getAccessToken } from "../utils/token";

interface RankingResponse {
  data: {
    rankings: RankingItem[];
  };
}

export async function fetchRanking(sortBy: string) {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");
  const response = await fetch(
    `https://devtime.prokit.app/api/rankings?sortBy=${sortBy}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) throw new Error("랭킹 불러오기 실패");
  const data: RankingResponse = await response.json();

  return data.data.rankings;
}
