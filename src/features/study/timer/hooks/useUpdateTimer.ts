import { useMutation } from "@tanstack/react-query";
import { updateTimer } from "../api/timer";
import { useTimerStore } from "@/store/timer";
import type { SplitTimes } from "..";

export function useUpdateTimer() {
  const { timerId, setStartTime, setLastUpdateTime, setSplitTimesOnly } =
    useTimerStore();

  return useMutation({
    mutationFn: (splitTimes: SplitTimes[]) => {
      if (!timerId) throw new Error("timerId가 없습니다.");

      return updateTimer(timerId, splitTimes);
    },
    onSuccess: (data) => {
      setStartTime(data.startTime);
      setLastUpdateTime(data.lastUpdateTime);
      setSplitTimesOnly(data.splitTimes);
    },
    retry: 0,
  });
}
