import type { RankingRequest, RankingResponse } from "..";
import { API_BASE_URL } from "../../../api/api";
import { getAccessToken } from "../../../lib/token";

export async function fetchRanking({
  sortBy,
  page,
  limit,
}: RankingRequest): Promise<RankingResponse> {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");
  const response = await fetch(
    `${API_BASE_URL}/api/rankings?sortBy=${sortBy}&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) throw new Error("랭킹 불러오기 실패");

  const data = await response.json();

  return data;
}
