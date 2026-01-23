import { create } from "zustand";
import type { SplitTimes } from "../features/study/timer";
import { timerStorage } from "../lib/timerStorage";

interface TimerState {
  // API 관련
  timerId: string | null;
  studyLogId: string | null;

  // 타이머 정보
  isRunning: boolean;
  startTime: Date | null; // 시작 지점
  seconds: number;
  splitTimes: SplitTimes[];

  // actions
  setTimerIds: (timerId: string, studyLogId: string) => void;
  setIsRunning: (isRunning: boolean) => void;
  setStartTime: (startTime: Date | null) => void;
  setSeconds: (seconds: number) => void;
  addSeconds: (seconds: number) => void;
  setSplitTimes: (splitTimes: SplitTimes[]) => void;
  addSplitTimes: (newSplitTimes: SplitTimes[]) => void;
  resetAll: () => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  timerId: null,
  studyLogId: null,
  isRunning: false,
  startTime: null,
  seconds: 0,
  splitTimes: [],

  setTimerIds: (timerId, studyLogId) => {
    timerStorage.setTimerData(timerId, studyLogId);
    set({ timerId, studyLogId });
  },

  setIsRunning: (isRunning) => {
    set({ isRunning });
  },

  setStartTime: (startTime) => {
    set({ startTime });
  },

  setSeconds: (seconds) => {
    set({ seconds });
  },

  addSeconds: (seconds) => {
    set((state) => ({ seconds: state.seconds + seconds }));
  },

  setSplitTimes: (splitTimes) => {
    set({ splitTimes });
  },

  addSplitTimes: (newSplitTimes) => {
    set((state) => ({ splitTimes: [...state.splitTimes, ...newSplitTimes] }));
  },

  resetAll: () => {
    timerStorage.clearTimerData();
    set({
      timerId: null,
      studyLogId: null,
      isRunning: false,
      startTime: null,
      seconds: 0,
      splitTimes: [],
    });
  },
}));
