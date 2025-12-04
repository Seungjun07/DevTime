import { getAccessToken } from "../utils/token";

export async function getPresignedUrl(file: File) {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");
  if (!file) throw new Error("업로드할 파일이 없습니다.");

  const response = await fetch(
    `https://devtime.prokit.app/api/file/presigned-url`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: file.name,
        contentType: file.type,
      }),
    },
  );

  if (!response.ok) throw new Error("이미지 요청 실패");

  const data = await response.json();

  return data; // {presignedUrl, key}
}

export async function uploadToS3(file: File, presignedUrl: string) {
  const response = await fetch(presignedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!response.ok) throw new Error("S3 업로드 실패");

  return true;
}
