export interface LoginData {
  accessToken: string;
  isDuplicateLogin: boolean;
  isFirstLogin: boolean;
  message: string;
  refreshToken: string;
  success: boolean;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
}
