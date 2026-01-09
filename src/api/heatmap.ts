import type { HeatmapApiResponse } from "../types";
import { getAccessToken } from "../utils/token";
import { API_BASE_URL } from "./api";

export async function fetchHeatMap(): Promise<HeatmapApiResponse> {
  const accessToken = getAccessToken();
  if (!accessToken) throw new Error("로그인 필요");

  const response = await fetch(`${API_BASE_URL}/api/heatmap`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw new Error("히트맵 불러오기 실패");
  const data = await response.json();

  return data;
}
