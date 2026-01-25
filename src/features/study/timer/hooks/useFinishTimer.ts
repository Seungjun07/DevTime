import { useMutation, useQueryClient } from "@tanstack/react-query";
import { finishTimer } from "../api/timer";
import type { SplitTimes } from "..";
import type { Task } from "../../study-log";
import { useTimerStore } from "@/store/timer";

interface Params {
  splitTimes: SplitTimes[];
  review: string;
  tasks: Task[];
}

export function useFinishTimer() {
  const resetTimer = useTimerStore((state) => state.reset);
  const timerId = useTimerStore((state) => state.timerId);

  return useMutation({
    mutationFn: ({ splitTimes, review, tasks }: Params) => {
      if (!timerId) throw new Error("타이머가 없습니다.");

      return finishTimer(timerId, splitTimes, review, tasks);
    },
    onSuccess: () => {
      resetTimer();
    },
    retry: 0,
  });
}
