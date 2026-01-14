import { useEffect, useState } from "react";
import { useTasksData } from "../../hooks/queries/use-tasks-data";
import { updateTasksOnServer } from "../../api/todos";
import type { Task } from "../../types";

import Dialog from "../common/Dialog/Dialog";
import Button from "../common/Button";
import TaskHeader from "../task/task-header";
import TaskEditor from "../task/task-editor";
import TaskList from "../task/task-list";

import useTasks from "../../hooks/use-tasks";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ManageTaskModal({ open, onClose }: ModalProps) {
  const { tasks, addTask, setTasks, removeTask, toggleTask, updateTask } =
    useTasks();

  const [isEditMode, setIsEditMode] = useState(false);
  const studyLogId = JSON.parse(localStorage.getItem("studyLogId") || "");
  const { data: tasksFromServer, isLoading } = useTasksData(studyLogId);

  useEffect(() => {
    if (tasksFromServer) {
      setTasks(tasksFromServer);
    }
  }, [tasksFromServer]);

  function isTasksChanged(prev: Task[], current: Task[]) {
    if (!prev || !current) return false;
    if (prev.length !== current.length) return true;

    const prevMap = new Map(prev.map((task) => [task.id, task]));

    return current.some((currentTask) => {
      const prevTask = prevMap.get(currentTask.id);

      if (!prevTask) return true;

      return (
        prevTask.content !== currentTask.content ||
        prevTask.isCompleted !== currentTask.isCompleted
      );
    });
  }

  const isDisabled = !isTasksChanged(tasksFromServer, tasks);

  async function updateTasks() {
    try {
      const studyLogId = JSON.parse(localStorage.getItem("studyLogId") || "");

      await updateTasksOnServer(studyLogId, tasks);
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  function editTask() {
    setIsEditMode(true);
  }

  function handleCancel() {
    return isEditMode ? setIsEditMode(false) : onClose();
  }

  return (
    <Dialog isOpen={open} onClose={onClose} className="w-160 p-9 pt-12">
      <div className="flex flex-col gap-9">
        <TaskEditor onAdd={addTask} />

        <div className="flex flex-col gap-6">
          <TaskHeader onEdit={editTask} />
          <TaskList
            tasks={tasks}
            mode={isEditMode ? "EDIT" : "VIEW"}
            onUpdate={updateTask}
            onRemove={removeTask}
            onToggle={toggleTask}
          />
        </div>
      </div>

      <Dialog.Footer>
        <Button onClick={handleCancel} variant={"tertiary"} size={"lg"}>
          취소
        </Button>
        {isEditMode ? (
          <Button
            disabled={isDisabled}
            onClick={() => setIsEditMode(false)}
            variant={"secondary"}
            size={"lg"}
          >
            변경 사항 저장하기
          </Button>
        ) : (
          <Button
            disabled={isDisabled}
            onClick={updateTasks}
            variant={"secondary"}
            size={"lg"}
          >
            저장하기
          </Button>
        )}
      </Dialog.Footer>
    </Dialog>
  );
}
