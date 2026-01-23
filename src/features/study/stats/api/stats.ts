import { API_BASE_URL } from "../../../../api/api";
import { getAccessToken } from "../../../../lib/token";
import type { Stats } from "../types/stats";

/**
 *
 * @returns consecutiveDays, totalStudyTime, averageDailyStudyTime, taskCompletionRate, weekdayStudyTime
 */
export async function getStats(): Promise<Stats> {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");

  const response = await fetch(`${API_BASE_URL}/api/stats`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) throw new Error("정보 불러오기 실패");

  const data = await response.json();

  return data;
}
