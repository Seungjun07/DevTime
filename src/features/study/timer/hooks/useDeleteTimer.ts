import { useMutation } from "@tanstack/react-query";
import { deleteTimer } from "../api/timer";
import { useTimerStore } from "@/store/timer";

export function useDeleteTimer() {
  const timerId = useTimerStore((state) => state.timerId);
  const reset = useTimerStore((state) => state.reset);

  return useMutation({
    mutationFn: () => {
      if (!timerId) throw new Error("타이머가 없습니다.");
      return deleteTimer(timerId);
    },
    onSuccess: () => {
      reset();
    },
    retry: 0,
  });
}
