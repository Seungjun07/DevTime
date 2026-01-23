import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchRanking } from "../api/ranking";

interface Params {
  sortBy?: string;
  limit?: number;
}

export function useInfiniteRanking({ sortBy = "total", limit = 10 }: Params) {
  return useInfiniteQuery({
    queryKey: ["rankings", sortBy, limit],
    queryFn: ({ pageParam }) =>
      fetchRanking({ sortBy, page: pageParam, limit }),
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage.data;
      if (pagination.hasNext) {
        return pagination.currentPage + 1;
      }

      return undefined;
    },
    initialPageParam: 1,
    retry: 0,
  });
}
