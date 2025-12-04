import { useMutation } from "@tanstack/react-query";
import { getPresignedUrl } from "../../api/file";

export function usePresignedUrl() {
  return useMutation({
    mutationFn: (file: File) => getPresignedUrl(file),
  });
}
