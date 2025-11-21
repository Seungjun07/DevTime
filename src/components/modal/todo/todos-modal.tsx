import { useState } from "react";
import TodoItem from "../../todo-item";
import { getAccessToken } from "../../../utils/token";

export default function TodosModal({
  onClick: onClose,
}: {
  onClick: () => void;
}) {
  const [todayGoal, setTodayGoal] = useState("");
  const [todos, setTodos] = useState<string[]>([]);
  const [todo, setTodo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = todos.length < 1 || !todayGoal.trim();

  function handleAddTodo() {
    if (todo.trim() === "") return;

    setTodos([...todos, todo]);
    setTodo("");
  }

  async function createTimer() {
    const accessToken = getAccessToken();

    if (!accessToken) {
      console.log("로그인 필요");
      return;
    }

    try {
      const response = await fetch(`https://devtime.prokit.app/api/timers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todayGoal, tasks: [...todos] }),
      });

      if (!response.ok) throw new Error("타이머 생성 실패");

      const data = await response.json();
      // 타이머 Id값 관리 필요 data.timerId
      localStorage.setItem("timerId", JSON.stringify(data.timerId));
      localStorage.setItem("studyLogId", JSON.stringify(data.studyLogId));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      {/* 모달 박스 */}
      <div className="flex w-160 flex-col justify-between gap-9 rounded-lg bg-white px-9 py-12">
        <div>
          <input
            value={todayGoal}
            onChange={(e) => setTodayGoal(e.target.value)}
            placeholder="오늘의 목표"
            maxLength={30}
            className="placeholder:text-disabled-300 text-secondary-indigo h-[46px] w-[568px] text-4xl leading-[46px] font-bold outline-none"
          />
        </div>
        <div className="flex w-142 flex-col gap-2">
          <label
            htmlFor="todo"
            className="text-sm leading-[18px] font-medium text-[#4b5563]"
          >
            할 일 목록
          </label>
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
          {todos.map((todo, i) => (
            <TodoItem key={i} todo={todo} />
          ))}
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
            onClick={createTimer}
            className={`h-12 cursor-pointer rounded-sm px-4 py-3 text-[18px] leading-[22px] font-semibold ${isDisabled ? "disabled-button" : "bg-primary-blue/10 text-primary-blue"}`}
          >
            타이머 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
