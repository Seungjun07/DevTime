export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

export function setAccessToken(accessToken: string) {
  return localStorage.setItem("accessToken", accessToken);
}

export function setRefreshToken(refreshToken: string) {
  return localStorage.setItem("refreshToken", refreshToken);
}

export function deleteToken() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}
