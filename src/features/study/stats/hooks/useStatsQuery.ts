import { useQuery } from "@tanstack/react-query";
import { getStats } from "../api/stats";

export function useStatsQuery() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
    retry: 0,
  });
}
