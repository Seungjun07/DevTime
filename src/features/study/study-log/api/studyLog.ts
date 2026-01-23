import { API_BASE_URL } from "../../../../api/api";
import { getAccessToken } from "../../../../lib/token";
import type {
  StudyLogDeleteReponse,
  StudyLogDetailResponse,
  StudyLogRequest,
  StudyLogResponse,
} from "..";

/**
 * 학습 기록 조회 (페이지네이션, 날짜 필터링 지원)
 * @param page
 * @param limit
 * @param date
 * @returns studyLogs, pagination
 */
export async function fetchStudyLogs({
  page,
  limit,
}: StudyLogRequest): Promise<StudyLogResponse> {
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

  if (!response.ok) throw new Error("학습 기록 불러오기 실패");

  const data = await response.json();

  return data;
}

/**
 * 특정 학습 기록 불러오기
 * @param studyLogId
 * @returns success, studyLogs
 */
export async function fetchStudyLogsById(
  studyLogId: string,
): Promise<StudyLogDetailResponse> {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");

  const response = await fetch(`${API_BASE_URL}/api/study-logs/${studyLogId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw new Error("특정 학습 기록 불러오기 실패");

  const data = await response.json();

  return data;
}

/**
 * 학습 기록 삭제
 * @param studyLogId
 * @returns success, message
 */
export async function deleteStudyLog(
  studyLogId: string,
): Promise<StudyLogDeleteReponse> {
  const accessToken = getAccessToken();
  if (!accessToken) throw new Error("로그인 필요");

  const response = await fetch(`${API_BASE_URL}/api/study-logs/${studyLogId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw new Error("학습 기록 삭제하기 실패");

  const data = await response.json();

  return data;
}
