import {
  deleteToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "../utils/token";

export async function fetchWithAuth(url: string) {
  const accessToken = getAccessToken();
  const headers = {
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
    "Content-Type": "application/json",
  };

  let response = await fetch(url, { headers });

  // AccessToken 만료 시 (401)
  if (response.status === 401) {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      deleteToken();
      throw new Error("NOT_LOGGED_IN");
    }

    const refreshResponse = await fetch(
      "https://devtime.prokit.app/api/auth/refresh",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken,
        }),
      },
    );

    if (!refreshResponse.ok) {
      deleteToken();
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      window.location.href = "/sign-in";
      return;
    }

    const data = await refreshResponse.json();
    setAccessToken(data.accessToken);

    headers.Authorization = `Bearer ${data.accessToken}`;

    response = await fetch(url, { headers });

    if (!response.ok) throw new Error("API_FAILED");
  }
  return response.json();
}
