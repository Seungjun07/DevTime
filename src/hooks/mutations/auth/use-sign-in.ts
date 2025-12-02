import { useMutation } from "@tanstack/react-query";
import { signIn } from "../../../api/auth";
import type { LoginData } from "../../../types";

export function useSignIn({
  onSuccess,
}: {
  onSuccess: (data: LoginData) => void;
}) {
  return useMutation({
    mutationFn: signIn,
    onSuccess,
  });
}
