// store/timer.ts
import type { SplitTimes, Timer } from "@/features/study/timer";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TimerState {
  seconds: number;
  isRunning: boolean;
  timerId: string | null;
  studyLogId: string | null;
  startTime: string | null;
  lastUpdateTime: string | null;
  splitTimes: SplitTimes[];

  setTimerInfo: (data: Timer) => void;
  start: (timerId: string, studyLogId: string, startTime: string) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  increment: () => void;

  setStartTime: (time: string) => void;
  setLastUpdateTime: (time: string) => void;
  setSplitTimes: (splitTimes: SplitTimes[]) => void;
  setSplitTimesOnly: (splitTimes: SplitTimes[]) => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
      seconds: 0,
      isRunning: false,
      timerId: null,
      studyLogId: null,
      startTime: null,
      lastUpdateTime: null,
      splitTimes: [],

      setTimerInfo: (data) => {
        set({
          timerId: data.timerId,
          studyLogId: data.studyLogId,
          splitTimes: data.splitTimes,
          startTime: data.startTime,
          lastUpdateTime: data.lastUpdateTime,
        });
      },
      start: (timerId, studyLogId, startTime) =>
        set({ isRunning: true, timerId, studyLogId, startTime }),
      pause: () => set({ isRunning: false }),
      resume: () => set({ isRunning: true }),
      reset: () =>
        set({
          seconds: 0,
          isRunning: false,
          timerId: null,
          studyLogId: null,
          startTime: null,
          lastUpdateTime: null,
          splitTimes: [],
        }),
      increment: () => set((state) => ({ seconds: state.seconds + 1 })),

      setStartTime: (time) => {
        set({ startTime: time });
      },
      setLastUpdateTime: (time) => {
        set({ lastUpdateTime: time });
      },
      setSplitTimes: (splitTimes) => {
        const totalMs = splitTimes.reduce((acc, cur) => acc + cur.timeSpent, 0);
        set({ splitTimes, seconds: Math.floor(totalMs / 1000) });
      },
      setSplitTimesOnly: (splitTimes) => {
        set({ splitTimes });
      },
    }),
    {
      name: "timer-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        seconds: state.seconds,
        timerId: state.timerId,
        studyLogId: state.studyLogId,
        startTime: state.startTime,
        lastUpdateTime: state.lastUpdateTime,
        splitTimes: state.splitTimes,
      }),
    },
  ),
);
