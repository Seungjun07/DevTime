import type { TechStack } from "../types";
import deleteIcon from "./../../../assets/x.png";

interface TechStackItemProps {
  stack: TechStack;
  onDelete: (id: number) => void;
}
export default function TechStackItem({ stack, onDelete }: TechStackItemProps) {
  return (
    <div className="bg-primary-blue/10 border-primary-blue flex h-11 w-auto items-center justify-center gap-2 rounded border p-3">
      {stack.name}
      <img
        onClick={() => onDelete(stack.id)}
        className="h-5 w-5 cursor-pointer"
        src={deleteIcon}
      />
    </div>
  );
}
