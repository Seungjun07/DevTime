import type { Task } from "../types";
import { getAccessToken } from "../utils/token";
import { API_BASE_URL } from "./api";

export async function createTimer(todayGoal: string, tasks: Task[]) {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");

  const response = await fetch(`${API_BASE_URL}/api/timers`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      todayGoal,
      tasks: tasks.map((task) => task.content),
    }),
  });

  if (!response.ok) throw new Error("타이머 생성 실패");

  const data = await response.json();
  // 타이머 Id값 관리 필요 data.timerId
  return data;
}

export async function deleteTimer(timerId: string) {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");
  const response = await fetch(`${API_BASE_URL}/api/timers/${timerId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw new Error("타이머 삭제 실패");
  const data = response.json();

  return data;
}
