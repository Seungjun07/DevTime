import { useQuery } from "@tanstack/react-query";
import { fetchStudyLogsById } from "../../api/studyLog";

export function useStudyLogTasksQuery(studyLogId: string | null) {
  return useQuery({
    queryKey: ["study-log", studyLogId],
    queryFn: () => {
      if (!studyLogId) throw new Error("studyLogId가 없습니다");

      return fetchStudyLogsById(studyLogId);
    },
    enabled: !!studyLogId,
    select: (response) => response.data.tasks,
    retry: 0,
  });
}
