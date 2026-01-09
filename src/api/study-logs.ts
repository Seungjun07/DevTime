import type { StudyLogResponse } from "../types";
import { getAccessToken } from "../utils/token";
import { API_BASE_URL } from "./api";

export async function fetchStudyLogs(
  page: number,
  limit: number,
): Promise<StudyLogResponse> {
  const accessToken = getAccessToken();
  if (!accessToken) throw new Error("로그인 필요");

  const response = await fetch(
    `${API_BASE_URL}/api/study-logs?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) throw new Error("공부 기록 불러오기 실패");
  const data = await response.json();

  return data;
}

export async function deleteStudyLog(studyLogId: string) {
  const accessToken = getAccessToken();
  if (!accessToken) throw new Error("로그인 필요");

  const response = await fetch(`${API_BASE_URL}/api/study-logs/${studyLogId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw new Error("공부 기록 삭제하기 실패");
  const data = await response.json();

  return data;
}
