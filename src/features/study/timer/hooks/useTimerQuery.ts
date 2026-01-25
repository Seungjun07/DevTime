import { useQuery } from "@tanstack/react-query";
import { fetchTimer } from "../api/timer";

export function useTimerQuery() {
  return useQuery({
    queryKey: ["timer"],
    queryFn: fetchTimer,
    retry: 0,
    staleTime: Infinity,
  });
}
