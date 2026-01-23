import { useMutation, useQueryClient } from "@tanstack/react-query";
import { finishTimer } from "../api/timer";
import type { SplitTimes } from "..";
import type { Task } from "../../study-log";
import { useTimerStore } from "../../../../store/timer";

interface Params {
  timerId: string;
  splitTimes: SplitTimes[];
  review: string;
  tasks: Task[];
}

export function useFinishTimer() {
  const queryClient = useQueryClient();
  const resetAll = useTimerStore((state) => state.resetAll);

  return useMutation({
    mutationFn: ({ timerId, splitTimes, review, tasks }: Params) =>
      finishTimer(timerId, splitTimes, review, tasks),
    onSuccess: () => {
      resetAll();
      queryClient.invalidateQueries({
        queryKey: ["timer"],
      });
    },
    retry: 0,
  });
}
