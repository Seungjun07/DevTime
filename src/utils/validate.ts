export function validateEmail(email: string) {
  if (!email.trim()) return "이메일을 입력해 주세요.";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) return "이메일 형식으로 작성해 주세요.";

  return "";
}

export function validateNickname(nickname: string) {
  if (!nickname.trim()) return "닉네임을 입력해 주세요.";

  return "";
}

export function validatePassword(password: string) {
  if (!password.trim()) return "비밀번호를 입력해 주세요.";

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!passwordRegex.test(password)) {
    return "비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.";
  }

  return "";
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string,
) {
  if (!confirmPassword.trim()) return "비밀번호를 입력해 주세요.";

  if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다.";

  return "";
}
