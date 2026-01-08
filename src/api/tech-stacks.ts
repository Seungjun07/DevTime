import { getAccessToken } from "../utils/token";
import { API_BASE_URL } from "./api";

export async function createTechStack(keyword: string) {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("토큰 만료 - 로그인 실패");

  const response = await fetch(`${API_BASE_URL}/api/tech-stacks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: keyword }),
  });

  if (!response.ok) throw new Error("기술 스택 생성 실패");
  const data = await response.json();

  return data.techStack;
}
