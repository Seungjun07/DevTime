import { useState } from "react";
import Dialog from "../../common/Dialog/Dialog";
import TextField from "../../common/TextField/TextField";
import Button from "../../common/Button";
import TaskList from "../../task/task-list";
import TaskEditor from "../../task/task-editor";
import useTasks from "../../../hooks/use-tasks";
import { createTimer } from "../../../api/timer";
// import { useTimerStore } from "../../../store/timer";
import { useTimer } from "../../../hooks/use-timer";

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
        <TaskEditor onAdd={addTask} />
        <TaskList tasks={tasks} onUpdate={updateTask} onRemove={removeTask} />
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

// import { createTimer } from "../../../api/timer";
// import type { TaskModalType } from "../../../types";
// import TaskList from "../../task/task-list";
// import useTasks from "../../../hooks/use-tasks";

// export default function CreateTasks({
//   onClose,
//   onStart,
//   type,
// }: {
//   onClose: () => void;
//   onStart: () => void;
//   type: TaskModalType;
// }) {
//   const { tasks, addTask, removeTask, updateTask } = useTasks();

//   const [todayGoal, setTodayGoal] = useState(""); // CREATE 모드
//   const isDisabled = tasks.length < 1 || !todayGoal.trim();

//   async function handleStartTimer() {
//     try {
//       const data = await createTimer(
//         todayGoal,
//         tasks.map((task) => task.content),
//       );
//       // 타이머 Id값 관리 필요 data.timerId
//       localStorage.setItem("timerId", JSON.stringify(data.timerId));
//       localStorage.setItem("studyLogId", JSON.stringify(data.studyLogId));

//       onStart();
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <>
//       {type === "CREATE" && (
//         <input
//           value={todayGoal}
//           onChange={(e) => setTodayGoal(e.target.value)}
//           placeholder="오늘의 목표"
//           maxLength={30}
//           className="placeholder:text-disabled-300 text-secondary-indigo h-[46px] text-4xl leading-[46px] font-bold outline-none"
//         />
//       )}
//       <TaskList
//         type={type}
//         tasks={tasks}
//         addTask={addTask}
//         removeTask={removeTask}
//         updateTask={updateTask}
//       />

//       <div className="flex justify-end gap-4">
//         <Button onClick={onClose} variant={"tertiary"} size={"lg"}>
//           취소
//         </Button>
//         <Button
//           disabled={isDisabled}
//           onClick={handleStartTimer}
//           variant={"secondary"}
//           size={"lg"}
//         >
//           타이머 시작하기
//         </Button>
//       </div>
//     </>
//   );
// }
