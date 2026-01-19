import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../../api/profile";

export function useUpdateProfile() {
  return useMutation({
    mutationFn: updateProfile,
    retry: 0,
  });
}
