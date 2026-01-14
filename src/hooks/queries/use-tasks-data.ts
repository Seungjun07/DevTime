import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../../api/todos";

export function useTasksData(studyLogId: string) {
  return useQuery({
    queryFn: () => fetchTasks(studyLogId),
    queryKey: ["tasks"],
    retry: false,
  });
}
