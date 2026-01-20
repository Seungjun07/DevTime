import { useState } from "react";
import type { TechStack } from "../types/techStack";

export function useTechStackSelector() {
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState<TechStack[]>([]);

  function addStack(stack: TechStack) {
    const exists = selected.some((item) => item.id === stack.id);

    if (!exists) {
      setSelected((prev) => [...prev, stack]);
    }
    setKeyword("");
  }

  function deleteStack(id: number) {
    setSelected((prev) => prev.filter((stack) => stack.id !== id));
  }

  return {
    keyword,
    selected,
    setKeyword,
    addStack,
    deleteStack,
  };
}
