import { API_BASE_URL } from "./api";

export async function checkNickname(nickname: string) {
  const response = await fetch(
    `${API_BASE_URL}/api/signup/check-nickname?nickname=${encodeURIComponent(nickname)}`,
  );

  if (!response.ok) throw new Error("닉네임 중복 검사 실패");
  const data = await response.json();

  return data;
}

export async function checkEmail(email: string) {
  const response = await fetch(
    `${API_BASE_URL}/api/signup/check-email?email=${encodeURIComponent(email)}`,
  );

  if (!response.ok) throw new Error("이메일 중복 검사 실패");
  const data = await response.json();

  // setIsEmailChecked({ available: data.available, message: data.message });
  return data;
}
