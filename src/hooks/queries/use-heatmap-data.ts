import { useQuery } from "@tanstack/react-query";
import { fetchHeatMap } from "../../api/heatmap";
import { type HeatmapValue } from "../../types";

export function useHeatmapData() {
  return useQuery<HeatmapValue[], Error>({
    queryKey: ["heatmap"],
    queryFn: async () => {
      const data = await fetchHeatMap();

      return data.heatmap.map((item) => ({
        date: item.date,
        count: item.colorLevel,
      }));
    },
  });
}
