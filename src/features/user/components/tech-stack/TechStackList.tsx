import type { TechStack } from "../../types/techStack";
import TechStackItem from "./TechStackItem";

interface TechStackListProps {
  techStacks: TechStack[];
  onDelete: (id: number) => void;
}

export default function TechStackList({
  techStacks,
  onDelete,
}: TechStackListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {techStacks &&
        techStacks.map((techStack) => (
          <TechStackItem
            key={techStack.id}
            stack={techStack}
            onDelete={onDelete}
          />
        ))}
    </div>
  );
}
