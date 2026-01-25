import { create } from "zustand";
import {
  deleteToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../lib/token";
import { combine } from "zustand/middleware";
import type { LoginResponse } from "@/features/auth/types/auth";
import { logout } from "@/features/auth/api/auth";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;

  login: () => void;
  logout: () => void;

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
      setTokens: (tokens: LoginResponse) => {
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
          console.log("로그아웃 실패!", error);
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
