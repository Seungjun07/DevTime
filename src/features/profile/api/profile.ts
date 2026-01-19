import { API_BASE_URL } from "../../../api/api";
import { getAccessToken } from "../../../utils/token";
import type {
  FetchProfileResponse,
  Profile,
  SuccessProfileResponse,
  UpdateProfileRequest,
} from "../types/types";

/**
 * 프로필 정보 조회
 * @returns email, nickname, profile{career,purpose,goal,techStacks,profileImage}
 */
export async function fetchProfile(): Promise<FetchProfileResponse> {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");

  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw new Error("프로필 불러오기 실패");

  const data = await response.json();

  return data;
}

/**
 * 프로필 생성
 * @param profile {career, purpose, goal, techStacks[], profileImage}
 * @returns success, message
 */
export async function createProfile(
  profile: Profile,
): Promise<SuccessProfileResponse> {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");

  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });

  if (!response.ok) throw new Error("프로필 생성 실패");

  const data = await response.json();

  return data;
}

/**
 * 회원 정보 수정
 * @param profile {nickname, profile{}, password}
 * @returns success, message
 */
export async function updateProfile(
  profile: UpdateProfileRequest,
): Promise<SuccessProfileResponse> {
  const accessToken = getAccessToken();

  if (!accessToken) throw new Error("로그인 필요");

  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });

  if (!response.ok) throw new Error("프로필 수정 실패");

  const data = await response.json();

  return data;
}
