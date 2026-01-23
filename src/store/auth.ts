import { create } from "zustand";
import type { LoginData } from "../types";
import {
  deleteToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../lib/token";
import { combine } from "zustand/middleware";
import { logout } from "../api/auth";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  login: () => void;
  logout: () => void;
  refreshAccessToken: () => void;

  isLogin: boolean;
}

const accessToken = getAccessToken();
const refreshToken = getRefreshToken();

const initialState = {
  accessToken: accessToken,
  refreshToken: refreshToken,
  isLogin: !!accessToken,
} as AuthState;

export const useAuthStore = create(
  combine(initialState, (set) => ({
    actions: {
      setTokens: (tokens: LoginData) => {
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);

        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          isLogin: true,
        });
      },
      logout: async () => {
        try {
          await logout();
        } catch (error) {
          console.log("로그아웃 실패!");
        }
        deleteToken();

        set({
          accessToken: null,
          refreshToken: null,
          isLogin: false,
        });
      },
    },
  })),
);
