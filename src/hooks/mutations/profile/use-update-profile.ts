import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../../../api/profile";

export function useUpdateProfile({ onSuccess }: { onSuccess: () => void }) {
  return useMutation({
    mutationFn: updateProfile,
    onSuccess,
  });
}
