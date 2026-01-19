export interface LoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  isFirstLogin: boolean;
  isDuplicateLogin: boolean;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface RefreshResponse {
  success: boolean;
  accessToken: string;
}
