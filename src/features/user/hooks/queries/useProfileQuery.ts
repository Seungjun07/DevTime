import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../../api/profile";

export function useProfileQuery() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    retry: 0,
  });
}
