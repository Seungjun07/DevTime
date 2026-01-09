import { useQuery } from "@tanstack/react-query";
import { fetchStudyLogs } from "../../api/study-logs";
import type { Pagination, StudyLog } from "../../types";

interface StudyLogsResult {
  studyLogs: StudyLog[];
  pagination: Pagination;
}

export function useStudyLogsData(page: number, limit: number) {
  return useQuery<StudyLogsResult, Error>({
    queryKey: ["studyLogs", page, limit],
    queryFn: async () => {
      const data = await fetchStudyLogs(page, limit);

      return {
        studyLogs: data.data.studyLogs,
        pagination: data.data.pagination,
      };
    },
  });
}
