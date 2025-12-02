import { useEffect, useState } from "react";
import { type Task, type TaskModalType } from "../../../types";
import { fetchTasksOnServer, updateTasksOnServer } from "../../../api/todos";
import TaskList from "../../task/task-list";
import useTasks from "../../../hooks/use-tasks";
import { useTasksData } from "../../../hooks/queries/use-tasks-data";

export default function ManageTodos({
  onClose,
  type,
}: {
  onClose: () => void;
  type: TaskModalType;
}) {
  const { tasks, setTasks, addTask, removeTask, toggleTask, updateTask } =
    useTasks();

  const [isEditMode, setIsEditMode] = useState(false);
  const [prevTasks, setPrevTasks] = useState<Task[]>([]);

  function isTasksChanged(prev: Task[], current: Task[]) {
    if (prev.length !== current.length) return true;

    return prev.some((task, index) => {
      const currentTask = current[index];

      return (
        task.content !== currentTask.content ||
        task.isCompleted !== currentTask.isCompleted
      );
    });
  }

  const isDisabled = !isTasksChanged(prevTasks, tasks);

  const studyLogId = JSON.parse(localStorage.getItem("studyLogId") || "");
  const { data, isLoading } = useTasksData(studyLogId);
  async function getTodos() {
    try {
      const data = await fetchTasksOnServer(studyLogId);
      setTasks(data);
      setPrevTasks(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  async function updateTasks() {
    try {
      const studyLogId = JSON.parse(localStorage.getItem("studyLogId") || "");

      await updateTasksOnServer(studyLogId, tasks);
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      {/* 모달 박스 */}
      <div className="flex w-160 flex-col justify-between gap-9 rounded-lg bg-white px-9 py-12">
        <TaskList
          type={type}
          updateTask={updateTask}
          addTask={addTask}
          removeTask={removeTask}
          toggleTask={toggleTask}
          tasks={tasks}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />

        <div className="flex justify-end gap-4">
          <button
            className="text-primary-blue h-12 cursor-pointer rounded-sm bg-gray-50 px-4 py-3 text-[18px] leading-[22px] font-semibold"
            onClick={onClose}
          >
            취소
          </button>
          {isEditMode ? (
            <button
              disabled={isDisabled}
              onClick={() => setIsEditMode(false)}
              className={`h-12 cursor-pointer rounded-sm px-4 py-3 text-[18px] leading-[22px] font-semibold ${isDisabled ? "disabled-button" : "bg-primary-blue/10 text-primary-blue"}`}
            >
              변경 사항 저장하기
            </button>
          ) : (
            <button
              disabled={isDisabled}
              onClick={updateTasks}
              className={`h-12 cursor-pointer rounded-sm px-4 py-3 text-[18px] leading-[22px] font-semibold ${isDisabled ? "disabled-button" : "bg-primary-blue/10 text-primary-blue"}`}
            >
              저장하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
