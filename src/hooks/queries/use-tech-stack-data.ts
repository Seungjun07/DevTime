import { useQuery } from "@tanstack/react-query";
import { fetchTechStacks } from "../../api/tech-stack";

export function useTechStack(debouncedKeyword: string) {
  return useQuery({
    queryKey: ["tech-stack", debouncedKeyword],
    queryFn: () => fetchTechStacks(debouncedKeyword),
  });
}
