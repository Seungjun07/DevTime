import { useMutation } from "@tanstack/react-query";
import { createTechStack } from "../../../api/tech-stacks";
import type { TechStack } from "../../../types";

export function useCreateTechStack({
  onSuccess,
}: {
  onSuccess: (stack: TechStack) => void;
}) {
  return useMutation({
    mutationFn: createTechStack,
    onSuccess,
  });
}
