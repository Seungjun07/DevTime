import type { LoginData } from "../types";
import { API_BASE_URL } from "./api";
import {
  deleteToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "../utils/token";

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (!response.ok) throw new Error("로그인 실패");

  const data: LoginData = await response.json();
  return data;
}

export async function fetchWithAuth(url: string, method: string) {
  const accessToken = getAccessToken();
  const headers = {
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
    "Content-Type": "application/json",
  };

  let response = await fetch(url, { method: method, headers });

  // AccessToken 만료 시 (401)
  if (response.status === 401) {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      deleteToken();
      throw new Error("NOT_LOGGED_IN");
    }

    const refreshResponse = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
    });

    if (!refreshResponse.ok) {
      deleteToken();
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      window.location.href = "/sign-in";
      return;
    }

    const data = await refreshResponse.json();
    setAccessToken(data.accessToken);

    headers.Authorization = `Bearer ${data.accessToken}`;

    response = await fetch(url, { method: method, headers });

    if (!response.ok) throw new Error("API_FAILED");
  }
  return response.json();
}

export async function logout() {
  const accessToken = getAccessToken();
  if (!accessToken) throw new Error("로그인 상태가 아님");

  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) throw new Error("로그아웃 실패");

  return;
}
