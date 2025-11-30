import { useState, type SetStateAction } from "react";
import useTasks from "../../hooks/use-tasks";
import type { Task, TaskModalType } from "../../types";
import TodoItem from "./../todo-item";
import editIcon from "./../../assets/edit.png";

export default function TaskList({
  type,
  tasks,
  addTask,
  updateTask,
  removeTask,
  toggleTask,
  setIsEditMode,
  isEditMode,
}: {
  type: TaskModalType;
  tasks: Task[];
  addTask: (content: string) => void;
  updateTask: (id: string, content: string) => void;
  removeTask: (id: string) => void;
  toggleTask?: (id: string) => void;
  setIsEditMode?: React.Dispatch<SetStateAction<boolean>>;
  isEditMode?: boolean;
}) {
  const [task, setTask] = useState("");

  function handleAddTask() {
    addTask(task);

    setTask("");
  }

  return (
    <div className="flex flex-col gap-9">
      <div className="flex w-142 flex-col gap-2">
        {type === "CREATE" && (
          <label
            htmlFor="todo"
            className="text-sm leading-[18px] font-medium text-[#4b5563]"
          >
            할 일 목록
          </label>
        )}
        <div className="relative">
          <input
            id="todo"
            maxLength={30}
            value={task}
            className="placeholder:text-disabled-300 h-14 w-full rounded-lg bg-[#f0f2f5] px-6 py-4 outline-none placeholder:text-[16px] placeholder:leading-5 placeholder:font-medium"
            onChange={(e) => setTask(e.target.value)}
            placeholder="할 일을 추가해 주세요."
          />
          <button
            onClick={handleAddTask}
            disabled={task === ""}
            className={`${task ? "text-primary-blue" : "text-disabled-400"} absolute top-[18px] right-6 bottom-[18px] cursor-pointer text-[16px] leading-5 font-bold`}
          >
            추가
          </button>
        </div>
      </div>

      <div className="scrollbar-hide flex h-115 flex-col gap-3 overflow-y-auto">
        {type !== "CREATE" && (
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
        )}
        {tasks?.map((task, i) => (
          <TodoItem
            key={task.id}
            id={task.id}
            content={task.content}
            onChange={updateTask}
            onRemove={removeTask}
            isCompleted={task.isCompleted}
            isEditMode={isEditMode ?? false}
            type={type}
            onToggle={() => toggleTask?.(task.id)}
          />
        ))}
      </div>
    </div>
  );
}
