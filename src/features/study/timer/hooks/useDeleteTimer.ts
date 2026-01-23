import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTimer } from "../api/timer";
import { useTimerStore } from "../../../../store/timer";

export function useDeleteTimer() {
  const queryClient = useQueryClient();
  const resetAll = useTimerStore((state) => state.resetAll);

  return useMutation({
    mutationFn: (timerId: string) => deleteTimer(timerId),
    onSuccess: () => {
      resetAll();
      queryClient.invalidateQueries({
        queryKey: ["timer"],
      });
    },
    retry: 0,
  });
}
