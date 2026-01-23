import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../../api/profile";

interface Callbacks {
  onSuccess: () => void;
  onError: () => void;
}

export function useUpdateProfile({ onSuccess, onError }: Callbacks) {
  return useMutation({
    mutationFn: updateProfile,
    onSuccess,
    onError,
    retry: 0,
  });
}
