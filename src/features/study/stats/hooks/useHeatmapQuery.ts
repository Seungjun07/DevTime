import { useQuery } from "@tanstack/react-query";
import { fetchHeatMap } from "../api/heatmap";

export function useHeatmapQuery() {
  return useQuery({
    queryKey: ["heatmap"],
    queryFn: fetchHeatMap,
    select: (response) =>
      response.heatmap.map((item) => ({
        date: item.date,
        count: item.colorLevel,
      })),
    retry: 0,
  });
}
