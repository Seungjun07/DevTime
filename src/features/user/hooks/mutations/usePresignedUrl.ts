import { useMutation } from "@tanstack/react-query";
import { getPresignedUrl } from "../../api/file";

export function usePresignedUrl() {
  return useMutation({
    mutationFn: getPresignedUrl,
    retry: 0,
  });
}
