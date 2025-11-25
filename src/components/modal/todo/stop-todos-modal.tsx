import { useEffect, useState } from "react";
import TodoItem from "../../todo-item";
import editIcon from "./../../../assets/edit.png";
import { getAccessToken } from "../../../utils/token";
import { type Task, type SplitTime } from "../../../types";

export default function StopTodosModal({
  onClick: onClose,
  splitTimes,
  deleteTimer,
}: {
  onClick: () => void;
  splitTimes: SplitTime[];
  deleteTimer: () => void;
}) {
  const [todos, setTodos] = useState<string[]>([]);
  const [todo, setTodo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>();
  const [studyReview, setStudyReview] = useState("");

  const isDisabled = studyReview.length < 15;

  function handleAddTodo() {
    if (todo.trim() === "") return;

    setTodos([...todos, todo]);
    setTodo("");
  }

  const studyLogId = JSON.parse(localStorage.getItem("studyLogId") || "");
  const timerId = JSON.parse(localStorage.getItem("timerId") || "");
  const accessToken = getAccessToken();
  async function getTodos() {
    try {
      if (!accessToken) throw new Error("로그인 필요");

      const response = await fetch(
        `https://devtime.prokit.app/api/study-logs/${studyLogId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!response.ok) throw new Error("할 일 불러오기 실패");
      const data = await response.json();
      setTasks(data.data);
      console.log("현재 할일", data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTodos();
    console.log(tasks);
  }, []);

  async function stopTimer() {
    try {
      if (!accessToken) throw new Error("로그인 필요");

      const response = await fetch(
        `https://devtime.prokit.app/api/timers/${timerId}/stop`,
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
            tasks: tasks.tasks,
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

        <div className="w-142">
          <div className="relative">
            <input
              id="todo"
              maxLength={30}
              value={todo}
              className="placeholder:text-disabled-300 h-14 w-full rounded-lg bg-[#f0f2f5] px-6 py-4 outline-none placeholder:text-[16px] placeholder:leading-5 placeholder:font-medium"
              onChange={(e) => setTodo(e.target.value)}
              placeholder="할 일을 추가해 주세요."
            />
            <button
              onClick={handleAddTodo}
              disabled={todo === ""}
              className={`${todo ? "text-primary-blue" : "text-disabled-400"} absolute top-[18px] right-6 bottom-[18px] cursor-pointer text-[16px] leading-5 font-bold`}
            >
              추가
            </button>
          </div>
        </div>

        <div className="scrollbar-hide flex h-115 flex-col gap-3 overflow-y-auto">
          <div className="mb-3 flex w-142 justify-between">
            <p className="text-xl leading-6 font-bold text-[#394252]">
              할 일 목록
            </p>
            <button className="flex cursor-pointer items-center gap-2">
              <img src={editIcon} alt="편집 아이콘" className="h-6 w-6" />
              <p className="text-sm leading-[18px] font-medium text-[#4b5563]">
                할 일 수정
              </p>
            </button>
          </div>
          {tasks?.tasks.map((task, i) => (
            <TodoItem key={task.id} {...task} type="MANAGE" />
          ))}
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
