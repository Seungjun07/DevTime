import { useEffect, useState } from "react";
import { getAccessToken } from "../../../utils/token";
import { type SplitTime, type TaskModalType } from "../../../types";
import { fetchTasksOnServer } from "../../../api/todos";
import useTasks from "../../../hooks/use-tasks";
import TaskList from "../../task/task-list";
import { API_BASE_URL } from "../../../api/api";

export default function StopTodosModal({
  onClose,
  splitTimes,
  deleteTimer,
  type,
}: {
  onClose: () => void;
  splitTimes: SplitTime[];
  deleteTimer: () => void;
  type: TaskModalType;
}) {
  const [studyReview, setStudyReview] = useState("");

  const isDisabled = studyReview.length < 15;

  const { tasks, setTasks, addTask, updateTask, removeTask, toggleTask } =
    useTasks();

  const studyLogId = JSON.parse(localStorage.getItem("studyLogId") || "");
  const timerId = JSON.parse(localStorage.getItem("timerId") || "");
  const accessToken = getAccessToken();

  async function getTodos() {
    try {
      const data = await fetchTasksOnServer(studyLogId);
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  async function stopTimer() {
    try {
      if (!accessToken) throw new Error("로그인 필요");

      const response = await fetch(
        `${API_BASE_URL}/api/timers/${timerId}/stop`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            timerId,
            splitTimes,
            review: studyReview,
            tasks: tasks,
          }),
        },
      );

      if (!response.ok) throw new Error("타이머 종료 실패");
      const data = await response.json();
      deleteTimer();
      window.location.href = "/";
      console.log("타이머 종료", data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      {/* 모달 박스 */}
      <div className="flex w-160 flex-col justify-between gap-9 rounded-lg bg-white px-9 py-12">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl leading-6 font-bold text-[#394252]">
            오늘도 수고하셨어요!
          </h1>
          <p className="text-[16px] leading-5 font-medium text-[#717887]">
            완료한 일을 체크하고, 오늘의 학습 회고를 작성해 주세요.
          </p>
        </div>
        <TaskList
          tasks={tasks}
          addTask={addTask}
          updateTask={updateTask}
          removeTask={removeTask}
          toggleTask={toggleTask}
          type={type}
        />

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
            className="placeholder:text-disabled-300 scrollbar-hide h-21 resize-none rounded-sm bg-[#f9fafb] px-4 py-3 text-[16px] leading-5 outline-none"
            id="studyReview"
            placeholder="오늘 학습한 내용을 회고해 보세요(15자 이상 작성 필수)"
            minLength={15}
            maxLength={500}
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            className="text-primary-blue h-12 cursor-pointer rounded-sm bg-gray-50 px-4 py-3 text-[18px] leading-[22px] font-semibold"
            onClick={onClose}
          >
            취소
          </button>
          <button
            disabled={isDisabled}
            onClick={() => {
              stopTimer();
            }}
            className={`h-12 cursor-pointer rounded-sm px-4 py-3 text-[18px] leading-[22px] font-semibold ${isDisabled ? "disabled-button" : "bg-primary-blue/10 text-primary-blue"}`}
          >
            공부 완료하기
          </button>
        </div>
      </div>
    </div>
  );
}
