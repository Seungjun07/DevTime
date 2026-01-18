export interface SignUpFormData {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
}

export interface CheckEmailResponse {
  success: boolean;
  available: boolean;
  message: string;
}

export interface CheckNicknameResponse {
  success: boolean;
  available: boolean;
  message: string;
}
