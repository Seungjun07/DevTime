import type { Task } from "../types";
import { getAccessToken } from "../utils/token";

export async function fetchTasksOnServer(studyLogId: string) {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");

  const response = await fetch(
    `https://devtime.prokit.app/api/study-logs/${studyLogId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) throw new Error("할 일 불러오기 실패");
  const data = await response.json();

  return data.data.tasks;
}

export async function updateTasksOnServer(studyLogId: string, tasks: Task[]) {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");

  const response = await fetch(
    `https://devtime.prokit.app/api/${studyLogId}/tasks`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tasks,
      }),
    },
  );

  if (!response.ok) throw new Error("할 일 수정 실패");
}
