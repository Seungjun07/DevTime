import type { HeatMapResponse } from "../types/heatmap";
import { API_BASE_URL } from "../../../../api/api";
import { getAccessToken } from "../../../../lib/token";

export async function fetchHeatMap(): Promise<HeatMapResponse> {
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
