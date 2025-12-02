import { useQuery } from "@tanstack/react-query";
import { fetchTasksOnServer } from "../../api/todos";

export function useTasksData(studyLogId: string) {
  return useQuery({
    queryFn: () => fetchTasksOnServer(studyLogId),
    queryKey: ["tasks"],
  });
}
