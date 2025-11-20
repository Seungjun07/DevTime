import type { TechStack } from "../types";
import deleteIcon from "./../assets/x.png";

export default function StackItem({
  techStacks,
  deleteStack,
}: {
  techStacks: TechStack[];
  deleteStack: (id: string) => void;
}) {
  return (
    <>
      {techStacks &&
        techStacks.map((techStack) => (
          <div
            key={techStack.id}
            className="bg-primary-blue/10 border-primary-blue flex h-11 w-auto items-center justify-center gap-2 rounded border p-3"
          >
            {techStack.name}
            <img
              onClick={() => deleteStack(techStack.id)}
              className="h-5 w-5"
              src={deleteIcon}
            />
          </div>
        ))}
    </>
  );
}
