import { useMutation } from "@tanstack/react-query";
import { signIn } from "../api/auth";
import type { LoginResponse } from "../types/auth";

export function useSignIn({
  onSuccess,
  onError,
}: {
  onSuccess: (data: LoginResponse) => void;
  onError: (data: LoginResponse) => void;
}) {
  return useMutation({
    mutationFn: signIn,
    onSuccess,
    onError,
  });
}
