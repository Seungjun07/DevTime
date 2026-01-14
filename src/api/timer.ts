import type { SplitTime, Task } from "../types";
import { getAccessToken } from "../utils/token";
import { API_BASE_URL } from "./api";

/**
 * 타이머 정보 불러오기
 * @returns timerId, studyLogId, splitTimes[{date, timeSpent}], startTime, lastUpdateTime
 */
export async function fetchTimer() {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");

  const response = await fetch(`${API_BASE_URL}/api/timers`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("타이머 불러오기 실패");

  const data = await response.json();

  return data;
}

/**
 * 타이머 생성하기
 * @param todayGoal
 * @param tasks
 * @returns timerId, studyLogId, startTime
 */
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

  return data;
}

/**
 * 타이머 상태 업데이트
 * @param timerId
 * @param splitTimes [{date, timeSpent}]
 * @returns startTime, splitTimes, lasUpdateTime
 */
async function updateTimer(timerId: string, splitTimes: SplitTime[]) {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");

  const response = await fetch(`${API_BASE_URL}/api/timers/${timerId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      splitTimes,
    }),
  });

  if (!response.ok) throw new Error("타이머 불러오기 실패");

  const data = await response.json();

  return data;
}

/**
 * 타이머 삭제/초기화 하기
 * @param timerId
 */
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

/**
 * @param timerId
 * @param splitTimes
 * @param review
 * @param tasks
 * @returns totalTime, endTime
 */
export async function stopTimer(
  timerId: string,
  splitTimes: SplitTime[],
  review: string,
  tasks: Task[],
) {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");

  const response = await fetch(`${API_BASE_URL}/api/timers/${timerId}/stop`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timerId,
      splitTimes,
      review,
      tasks,
    }),
  });

  if (!response.ok) throw new Error("타이머 종료 실패");

  const data = await response.json();

  return data;
}
