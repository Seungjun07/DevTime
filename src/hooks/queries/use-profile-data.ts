import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../../api/profile";

export function useProfileData() {
  return useQuery({
    queryFn: fetchProfile,
    queryKey: ["profile"],
    retry: false,
  });
}
