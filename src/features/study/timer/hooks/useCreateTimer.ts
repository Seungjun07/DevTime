import { useMutation } from "@tanstack/react-query";
import { createTimer } from "../api/timer";
import type { Task } from "../../study-log";
import { useTimerStore } from "@/store/timer";

interface Params {
  todayGoal: string;
  tasks: Task[];
}

export function useCreateTimer() {
  const start = useTimerStore((state) => state.start);

  return useMutation({
    mutationFn: ({ todayGoal, tasks }: Params) => createTimer(todayGoal, tasks),
    onSuccess: (data) => {
      start(data.timerId, data.studyLogId, data.startTime);
    },
    retry: 0,
  });
}
