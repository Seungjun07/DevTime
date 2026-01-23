import { useMutation } from "@tanstack/react-query";
import { createTimer } from "../api/timer";
import type { Task } from "../../study-log";

interface Params {
  todayGoal: string;
  tasks: Task[];
}

export function useCreateTimer() {
  return useMutation({
    mutationFn: ({ todayGoal, tasks }: Params) => createTimer(todayGoal, tasks),
    retry: 0,
  });
}
