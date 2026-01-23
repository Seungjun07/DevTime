import { useQuery } from "@tanstack/react-query";
import { fetchTimer } from "../api/timer";

export function useTimerQuery(enabled: boolean = true) {
  return useQuery({
    queryKey: ["timer"],
    queryFn: fetchTimer,
    retry: 0,
    enabled,
    refetchInterval: enabled ? 10 * 60 * 1000 : false,
  });
}
