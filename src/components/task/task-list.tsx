import { useState, type SetStateAction } from "react";
import useTasks from "../../hooks/use-tasks";
import type { Task, TaskModalType } from "../../types";
import TodoItem from "./../todo-item";
import editIcon from "./../../assets/edit.png";
import TaskItem from "./task-item";

interface TaskListProps {
  tasks: Task[];
  isEditMode?: boolean;
  onUpdate: (id: string, content: string) => void;
  onRemove: (id: string) => void;
  onToggle?: (id: string) => void;
}

export default function TaskList({
  tasks,
  onUpdate,
  onRemove,
  onToggle,
  isEditMode,
}: TaskListProps) {
  return (
    <div className="scrollbar-hide flex h-115 flex-col gap-3 overflow-y-auto">
      {/* {type !== "CREATE" && (
          <div className="mb-3 flex w-142 justify-between">
            <p className="text-xl leading-6 font-bold text-[#394252]">
              할 일 목록
            </p>
            {!isEditMode && type === "UPDATE" && (
              <button
                onClick={() => setIsEditMode?.(true)}
                className="flex cursor-pointer items-center gap-2"
              >
                <img src={editIcon} alt="편집 아이콘" className="h-6 w-6" />
                <p className="text-sm leading-[18px] font-medium text-[#4b5563]">
                  할 일 수정
                </p>
              </button>
            )}
          </div>
        )} */}
      {tasks?.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          content={task.content}
          isCompleted={task.isCompleted}
          isEditMode={isEditMode ?? false}
          onChange={onUpdate}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
