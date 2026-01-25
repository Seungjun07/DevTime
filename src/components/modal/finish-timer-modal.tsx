import { useEffect, useState } from "react";
import Dialog from "../common/Dialog/Dialog";
import Button from "../common/Button";
import useTasks from "../../features/study/study-log/hooks/useTasks";
import TaskEditor from "../../features/study/study-log/components/task/task-editor";
import TaskHeader from "../../features/study/study-log/components/task/task-header";
import TaskList from "../../features/study/study-log/components/task/task-list";
import { useStudyLogTasksQuery } from "../../features/study/study-log/hooks/queries/useStudyLogTasksQuery";
import { useTimerStore } from "@/store/timer";
import { useFinishTimer } from "@/features/study/timer/hooks/useFinishTimer";
import { splitTimeByDate } from "@/utils/split-time-by-date";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function FinishTimerModal({ onClose, open }: ModalProps) {
  const [studyReview, setStudyReview] = useState("");

  const isDisabled = studyReview.length < 15;

  const { startTime, studyLogId, timerId } = useTimerStore();
  const { mutate: stopTimer } = useFinishTimer();

  const { tasks, setTasks, addTask, updateTask, removeTask, toggleTask } =
    useTasks();

  const [isEditMode, setIsEditMode] = useState(false);

  const { data: tasksFromServer } = useStudyLogTasksQuery(studyLogId);

  useEffect(() => {
    if (tasksFromServer) {
      setTasks(tasksFromServer);
    }
  }, [tasksFromServer, setTasks]);

  function handleFinish() {
    if (!timerId || !studyLogId) return;

    if (!startTime) return;

    const endTime = new Date().toISOString();

    const splitTimes = splitTimeByDate(startTime, endTime);

    stopTimer({ review: studyReview, splitTimes, tasks });

    onClose();
  }

  function editTask() {
    setIsEditMode(true);
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
