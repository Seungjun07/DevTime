import { getAccessToken } from "../utils/token";

export async function fetchTechStacks(keyword: string) {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");
  const response = await fetch(
    `https://devtime.prokit.app/api/tech-stacks?keyword=${keyword}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) throw new Error("기술 스택 불러오기 실패");
  const data = await response.json();

  return data.results || [];
}
