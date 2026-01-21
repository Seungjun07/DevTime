import { useQuery } from "@tanstack/react-query";
import { fetchStudyLogsById } from "../api/studyLog";

export function useStudyLogDetailQuery(studyLogId: string) {
  return useQuery({
    queryKey: ["study-log", studyLogId],
    queryFn: () => fetchStudyLogsById(studyLogId),
  });
}
