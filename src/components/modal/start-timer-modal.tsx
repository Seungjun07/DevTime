import { useState } from "react";
import Dialog from "../common/Dialog/Dialog";
import TextField from "../common/TextField/TextField";
import Button from "../common/Button";
import TaskList from "../task/task-list";
import TaskEditor from "../task/task-editor";
import useTasks from "../../hooks/use-tasks";
import { createTimer } from "../../api/timer";
// import { useTimerStore } from "../../../store/timer";
import { useTimer } from "../../hooks/use-timer";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function StartTimderModal({ open, onClose }: ModalProps) {
  const { tasks, addTask, updateTask, removeTask } = useTasks();
  // const { timerId, startTimer, seconds, tick, startTime } = useTimerStore();
  // const { startTimer } = useTimer();
  const [goal, setGoal] = useState("");

  const isDisabled = tasks.length === 0 || !goal.trim();

  async function handleStartTimer() {
    if (!goal.trim() || tasks.length === 0) return;

    try {
      const data = await createTimer(goal, tasks);
      console.log("click");
      localStorage.setItem("timerId", JSON.stringify(data.timerId));
      localStorage.setItem("studyLogId", JSON.stringify(data.studyLogId));

      onClose();
    } catch (error) {
      console.log("타이머 시작 실패", error);
    }
  }

  return (
    <Dialog isOpen={open} onClose={onClose} className="w-160 p-9 pt-12">
      <Dialog.Content>
        <TextField id="goal" className="w-full">
          <TextField.Input
            placeholder="오늘의 목표"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            maxLength={30}
            className="placeholder:text-disabled-300 text-secondary-indigo h-[46px] bg-white text-4xl leading-[46px] font-bold outline-none"
          />
        </TextField>
      </Dialog.Content>

      <div className="flex flex-col gap-9">
        <TaskEditor onAdd={addTask} label={"할 일 목록"} />
        <TaskList
          tasks={tasks}
          mode="CREATE"
          onUpdate={updateTask}
          onRemove={removeTask}
        />
      </div>

      <Dialog.Footer>
        <Button variant={"tertiary"} onClick={onClose}>
          취소
        </Button>
        <Button
          variant={"secondary"}
          disabled={isDisabled}
          onClick={handleStartTimer}
        >
          타이머 시작하기
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
}
