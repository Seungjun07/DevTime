import { useState } from "react";
import { createTimer } from "../../../api/timer";
import type { TaskModalType } from "../../../types";
import TaskList from "../../task/task-list";
import useTasks from "../../../hooks/use-tasks";

export default function CreateTasks({
  onClose,
  onStart,
  type,
}: {
  onClose: () => void;
  onStart: () => void;
  type: TaskModalType;
}) {
  const { tasks, addTask, removeTask, updateTask } = useTasks();

  const [todayGoal, setTodayGoal] = useState(""); // CREATE 모드
  const isDisabled = tasks.length < 1 || !todayGoal.trim();

  async function handleStartTimer() {
    try {
      const data = await createTimer(
        todayGoal,
        tasks.map((task) => task.content),
      );
      // 타이머 Id값 관리 필요 data.timerId
      localStorage.setItem("timerId", JSON.stringify(data.timerId));
      localStorage.setItem("studyLogId", JSON.stringify(data.studyLogId));

      onStart();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {type === "CREATE" && (
        <input
          value={todayGoal}
          onChange={(e) => setTodayGoal(e.target.value)}
          placeholder="오늘의 목표"
          maxLength={30}
          className="placeholder:text-disabled-300 text-secondary-indigo h-[46px] text-4xl leading-[46px] font-bold outline-none"
        />
      )}
      <TaskList
        type={type}
        tasks={tasks}
        addTask={addTask}
        removeTask={removeTask}
        updateTask={updateTask}
      />

      <div className="flex justify-end gap-4">
        <button
          className="text-primary-blue h-12 cursor-pointer rounded-sm bg-gray-50 px-4 py-3 text-[18px] leading-[22px] font-semibold"
          onClick={onClose}
        >
          취소
        </button>
        <button
          disabled={isDisabled}
          onClick={handleStartTimer}
          className={`h-12 cursor-pointer rounded-sm px-4 py-3 text-[18px] leading-[22px] font-semibold ${isDisabled ? "disabled-button" : "bg-primary-blue/10 text-primary-blue"}`}
        >
          타이머 시작하기
        </button>
      </div>
    </>
  );
}
