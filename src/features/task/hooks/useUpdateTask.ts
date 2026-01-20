import { useMutation } from "@tanstack/react-query";
import { updateTaskApi } from "../api/task";

export function useUpdateTask() {
  return useMutation({
    mutationFn: updateTaskApi,
    retry: 0,
  });
}
