import { useEffect, useState } from "react";
import Dialog from "../common/Dialog/Dialog";
import TaskEditor from "../task/task-editor";
import TaskHeader from "../task/task-header";
import { useTasksData } from "../../hooks/queries/use-tasks-data";
import { useTimer } from "../../hooks/use-timer";
import { useDeleteTimer } from "../../hooks/mutations/timer/use-delete-timer";
import useTasks from "../../hooks/use-tasks";
import TaskList from "../task/task-list";
import Button from "../common/Button";
import { getAccessToken } from "../../utils/token";
import { stopTimer } from "../../api/timer";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function FinishTimerModal({ onClose, open }: ModalProps) {
  const studyLogId = JSON.parse(localStorage.getItem("studyLogId") || "");
  const timerId = JSON.parse(localStorage.getItem("timerId") || "");

  const [studyReview, setStudyReview] = useState("");

  const isDisabled = studyReview.length < 15;

  const { splitTimes, resetTimer } = useTimer();

  const { tasks, setTasks, addTask, updateTask, removeTask, toggleTask } =
    useTasks();
  const [isEditMode, setIsEditMode] = useState(false);

  const accessToken = getAccessToken();

  const { data: tasksFromServer, isLoading } = useTasksData(studyLogId);
  const { mutate: deleteTimer } = useDeleteTimer();

  useEffect(() => {
    if (tasksFromServer) {
      setTasks(tasksFromServer);
    }
  }, [tasksFromServer]);

  async function finishTimer() {
    try {
      const data = await stopTimer(timerId, splitTimes, studyReview, tasks);

      deleteTimer(timerId);

      resetTimer();

      console.log("타이머 종료", data);
    } catch (error) {
      console.log(error);
    }
  }

  function editTask() {
    setIsEditMode(true);
  }

  function handleFinish() {
    finishTimer();
    onClose();
  }

  return (
    <Dialog isOpen={open} onClose={onClose} className="w-160 p-9 pt-12">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl leading-6 font-bold text-[#394252]">
          오늘도 수고하셨어요!
        </h1>
        <p className="text-[16px] leading-5 font-medium text-[#717887]">
          완료한 일을 체크하고, 오늘의 학습 회고를 작성해 주세요.
        </p>
      </div>

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

      <div className="flex flex-col gap-2">
        <label
          htmlFor="studyReview"
          className="text-sm leading-[18px] font-medium text-[#4b5563]"
        >
          학습 회고
        </label>
        <textarea
          required
          value={studyReview}
          onChange={(e) => setStudyReview(e.target.value)}
          className="placeholder:text-disabled-300 scrollbar-hide bg-tertiary h-21 resize-none rounded-sm px-4 py-3 text-[16px] leading-5 outline-none"
          id="studyReview"
          placeholder="오늘 학습한 내용을 회고해 보세요(15자 이상 작성 필수)"
          minLength={15}
          maxLength={500}
        />
      </div>

      <Dialog.Footer>
        <Button onClick={onClose} variant={"tertiary"} size={"lg"}>
          취소
        </Button>
        <Button
          disabled={isDisabled}
          onClick={handleFinish}
          variant={"secondary"}
          size={"lg"}
        >
          공부 완료하기
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
}
