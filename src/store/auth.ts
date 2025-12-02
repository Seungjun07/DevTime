import { create } from "zustand";
import type { LoginData } from "../types";
import { setAccessToken, setRefreshToken } from "../utils/token";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (data: LoginData) => void;
  createAccessToken: () => void;
  createRefreshToken: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  setTokens: (data) => {
    set({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });

    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
  },
  createAccessToken: () => {},
  createRefreshToken: () => {},
  logout: () => {},
}));
