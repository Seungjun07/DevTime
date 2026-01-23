import { API_BASE_URL } from "../../../api/api";
import { getAccessToken } from "../../../lib/token";
import type { PresignedUrlResponse } from "../types/file";

/**
 * 이미지 업로드를 위한 Presigned URL 발급
 * @param file
 * @returns presignedUrl, key
 */
export async function getPresignedUrl(
  file: File,
): Promise<PresignedUrlResponse> {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");
  if (!file) throw new Error("업로드할 파일이 없습니다.");

  const response = await fetch(`${API_BASE_URL}/api/file/presigned-url`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type,
    }),
  });

  if (!response.ok) throw new Error("이미지 요청 실패");

  const data = await response.json();

  return data;
}
