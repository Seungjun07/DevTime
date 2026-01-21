import { useQuery } from "@tanstack/react-query";
import { fetchStudyLogs } from "../api/studyLog";

interface Params {
  page?: number;
  limit?: number;
}

export function useStudyLogQuery({ page = 1, limit = 10 }: Params) {
  return useQuery({
    queryKey: ["study-log", { page, limit }],
    queryFn: () => fetchStudyLogs({ page, limit }),
    retry: 0,
  });
}
