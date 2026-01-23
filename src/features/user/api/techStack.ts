import { API_BASE_URL } from "../../../api/api";
import { getAccessToken } from "../../../lib/token";
import type { TechStack } from "../types/techStack";

/**
 * 기술 스택 검색
 * @param keyword
 * @returns id, name, createdAt, updatedAt
 */
export async function fetchTechStacks(keyword: string): Promise<TechStack[]> {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");
  const response = await fetch(
    `${API_BASE_URL}/api/tech-stacks?keyword=${keyword}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) throw new Error("기술 스택 불러오기 실패");

  const data = await response.json();

  return data.results;
}

/**
 * 기술 스택 검색
 * @param keyword
 * @returns message, techStack {id, name, createdAt, updatedAt}
 */
export async function createTechStack(keyword: string): Promise<TechStack> {
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
