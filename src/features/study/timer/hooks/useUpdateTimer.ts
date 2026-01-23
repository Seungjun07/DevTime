import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTimer } from "../api/timer";
import type { SplitTimes } from "..";

interface Params {
  timerId: string;
  splitTimes: SplitTimes[];
}

export function useUpdateTimer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ timerId, splitTimes }: Params) =>
      updateTimer(timerId, splitTimes),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["timer"],
      });
    },
    retry: 0,
  });
}
