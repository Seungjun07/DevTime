import type { Task } from "../types";
import TaskItem, { type TaskItemMode } from "./task-item";

interface TaskListProps {
  tasks: Task[];
  mode: TaskItemMode;
  onUpdate: (id: string, content: string) => void;
  onRemove: (id: string) => void;
  onToggle?: (id: string) => void;
}

export default function TaskList({
  tasks,
  onUpdate,
  onRemove,
  onToggle,
  mode,
}: TaskListProps) {
  return (
    <div className="scrollbar-hide flex h-115 flex-col gap-3 overflow-y-auto">
      {tasks?.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          content={task.content}
          isCompleted={task.isCompleted}
          mode={mode}
          onChange={onUpdate}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
