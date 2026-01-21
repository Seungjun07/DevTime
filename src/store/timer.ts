import { create } from "zustand";
import type { Task } from "../types";

interface TimerState {
  // API 관련
  timerId: string | null;

  // 타이머 정보
  isRunning: boolean;
  startTime: string | null; // 시작 지점
  elapsedTime: number; // 누적 시간

  // actions
  startTimer: (timerId: string, startTime: string) => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  timerId: null,

  isRunning: false,
  startTime: null,
  elapsedTime: 0,

  startTimer: (timerId, startTime) => {
    set({ isRunning: true, timerId, startTime, elapsedTime: 0 });
  },

  pauseTimer: () => {
    const { startTime, elapsedTime } = get();

    if (startTime) {
      const startTimeStamp = new Date(startTime).getTime();
      set({
        isRunning: false,
        elapsedTime: elapsedTime + (Date.now() - startTimeStamp),
        startTime: null,
      });
    }
  },

  resetTimer: () => {
    set({
      isRunning: false,
      elapsedTime: 0,
      startTime: null,
      timerId: null,
    });
  },
}));
