import { useMutation } from "@tanstack/react-query";
import { createProfile } from "../../../api/profile";

export function useCreateProfile({ onSuccess }: { onSuccess: () => void }) {
  return useMutation({
    mutationFn: createProfile,
    onSuccess,
  });
}
