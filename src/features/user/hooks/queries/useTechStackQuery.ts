import { useQuery } from "@tanstack/react-query";
import { fetchTechStacks } from "../../api/techStack";

export function useTechStackQuery(debouncedKeyword: string) {
  return useQuery({
    queryKey: ["tech-stack", debouncedKeyword],
    queryFn: () => fetchTechStacks(debouncedKeyword),
    retry: 0,
    enabled: debouncedKeyword.length > 0,
  });
}
