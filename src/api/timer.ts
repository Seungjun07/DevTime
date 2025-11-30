import { getAccessToken } from "../utils/token";

export async function createTimer(todayGoal: string, tasks: string[]) {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");

  const response = await fetch(`https://devtime.prokit.app/api/timers`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      todayGoal,
      tasks,
    }),
  });

  if (!response.ok) throw new Error("타이머 생성 실패");

  const data = await response.json();
  // 타이머 Id값 관리 필요 data.timerId
  return data;
}
