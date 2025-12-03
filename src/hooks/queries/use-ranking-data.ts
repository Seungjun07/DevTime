import { useQuery } from "@tanstack/react-query";
import { fetchRanking } from "../../api/ranking";

export function useRankingData(sortBy: string) {
  return useQuery({
    queryFn: () => fetchRanking(sortBy),
    queryKey: ["ranking", sortBy],
  });
}
