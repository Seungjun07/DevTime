import type { MyProfile } from "../types";
import { deleteToken, getAccessToken } from "../utils/token";

export async function fetchProfile() {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");

  const response = await fetch("https://devtime.prokit.app/api/profile", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    deleteToken();
  }

  if (!response.ok) throw new Error("프로필 불러오기 실패");
  const data: MyProfile = await response.json();
  console.log(data);
  return data;
}
