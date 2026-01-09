import type { CreateProfileForm, MyProfile, ProfileForm } from "../types";
import { deleteToken, getAccessToken } from "../utils/token";
import { API_BASE_URL } from "./api";

export async function fetchProfile() {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");

  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    deleteToken();
  }

  if (!response.ok) throw new Error("프로필 불러오기 실패");
  const data: MyProfile = await response.json();
  return data;
}

export async function createProfile(body: CreateProfileForm) {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");

  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error("프로필 생성 실패");
  const data = await response.json();

  return data;
}

export async function updateProfile(body: ProfileForm) {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");

  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error("프로필 수정 실패");

  const data = await response.json();
  return data;
}
