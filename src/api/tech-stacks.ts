import type { TechStack } from "../types";
import { getAccessToken } from "../utils/token";

export async function createTechStack(keyword: string) {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("토큰 만료 - 로그인 실패");

  const response = await fetch("https://devtime.prokit.app/api/tech-stacks", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: keyword }),
  });

  if (!response.ok) throw new Error("기술 스택 생성 실패");
  const data = await response.json();

  console.log(data);
  return data.techStack;
}
