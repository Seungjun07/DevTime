import { API_BASE_URL } from "../../../api/api";
import type {
  CheckEmailResponse,
  CheckNicknameResponse,
  SignUpFormData,
  SignupResponse,
} from "../types/signup";

/**
 * 이메일 중복 검사
 * @param email
 * @returns success, available, message
 */
export async function checkEmail(email: string): Promise<CheckEmailResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/signup/check-email?email=${encodeURIComponent(email)}`,
  );

  if (!response.ok) throw new Error("이메일 중복 검사 실패");
  const data = await response.json();

  return data;
}

/**
 * 닉네임 중복 검사
 * @param nickname
 * @returns success, available, message
 */
export async function checkNickname(
  nickname: string,
): Promise<CheckNicknameResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/signup/check-nickname?nickname=${encodeURIComponent(nickname)}`,
  );

  if (!response.ok) throw new Error("닉네임 중복 검사 실패");
  const data = await response.json();

  return data;
}

/**
 * 회원가입 API
 * @param email, nickname, password, confirmPassword
 * @returns success, message
 */
export async function signUp(form: SignUpFormData): Promise<SignupResponse> {
  const response = await fetch(`${API_BASE_URL}/api/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  if (!response.ok) throw new Error("회원가입 실패");

  const data = await response.json();

  return data;
}
