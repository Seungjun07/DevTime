import { useMutation } from "@tanstack/react-query";
import { createTechStack } from "../../api/techStack";
import type { TechStack } from "../../types";

interface useCreateTechStackOptions {
  onSuccess: (stack: TechStack) => void;
}

export function useCreateTechStack(options?: useCreateTechStackOptions) {
  return useMutation({
    mutationFn: createTechStack,
    onSuccess: (data) => {
      options?.onSuccess(data);
    },
  });
}
