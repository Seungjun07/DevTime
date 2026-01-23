import { useEffect, useState } from "react";

import Dialog from "../common/Dialog/Dialog";
import Button from "../common/Button";
import useTasks from "../../features/study/study-log/hooks/useTasks";
import { useUpdateTask } from "../../features/study/study-log/hooks/useUpdateTask";
import TaskEditor from "../../features/study/study-log/components/task/task-editor";
import TaskHeader from "../../features/study/study-log/components/task/task-header";
import TaskList from "../../features/study/study-log/components/task/task-list";
import { useStudyLogTasksQuery } from "../../features/study/study-log/hooks/queries/useStudyLogTasksQuery";
import type { Task } from "../../features/study/study-log";
import { useTimerStore } from "../../store/timer";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ManageTaskModal({ open, onClose }: ModalProps) {
  const { studyLogId } = useTimerStore();
  const { tasks, addTask, setTasks, removeTask, toggleTask, updateTask } =
    useTasks();

  const [isEditMode, setIsEditMode] = useState(false);

  const { data: tasksFromServer = [] } = useStudyLogTasksQuery(studyLogId);

  useEffect(() => {
    if (tasksFromServer?.length > 0) {
      setTasks(tasksFromServer);
    }
  }, [tasksFromServer, setTasks]);

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

  const { mutate: updateTasks } = useUpdateTask();

  function handleUpdateTask() {
    if (!studyLogId) return;

    updateTasks({ studyLogId, tasks });

    onClose();
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
            onClick={handleUpdateTask}
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
