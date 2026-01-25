import type { RequestInit } from "next/dist/server/web/spec-extension/request";
import { API_BASE_URL } from "../../../api/api";
import {
  getAccessToken,
  getRefreshToken,
  deleteToken,
  setAccessToken,
} from "../../../lib/token";
import type {
  LoginResponse,
  LogoutResponse,
  RefreshResponse,
} from "../types/auth";

/**
 * 로그인
 * @param email, password
 * @returns success, message, accessToken, refreshToken, isFirstLogin, isDuplicateLogin
 */
export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) throw new Error("로그인 실패");

  const data = await response.json();

  return data;
}

/**
 * 로그아웃
 * @returns success, message
 */
export async function logout(): Promise<LogoutResponse> {
  const accessToken = getAccessToken();
  if (!accessToken) throw new Error("로그인 상태가 아님");

  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) throw new Error("로그아웃 실패");

  const data = await response.json();

  return data;
}

/**
 * 액세스 토큰 갱신
 * @returns suceess, accessToken
 */
export async function refresh(): Promise<RefreshResponse> {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    deleteToken();
    throw new Error("NOT_LOGGED_IN");
  }

  const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      refreshToken,
    }),
  });

  if (!response.ok) {
    deleteToken();
    alert("세션이 만료되었습니다. 다시 로그인해주세요.");
    window.location.href = "/sign-in";
  }

  const data = await response.json();

  setAccessToken(data.accessToken);

  return data;
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  let accessToken = getAccessToken();
  options.headers = {
    ...(options.headers || {}),
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
    "Content-Type": "application/json",
  };

  let response = await fetch(url, options);

  // AccessToken 만료 시 (401)
  if (response.status === 401) {
    const refreshData = await refresh();
    accessToken = refreshData.accessToken;

    if (!accessToken) throw new Error("NOT_LOGGED_IN");

    response = await fetch(url, options);

    if (!response.ok) throw new Error("API_FAILED");
  }
  return response.json();
}
