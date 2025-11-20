import { useState } from "react";
import TodoItem from "../todo-item";
import { getAccessToken } from "../../utils/token";

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
      <div className="flex h-[828px] w-160 flex-col justify-between rounded-lg bg-white shadow-lg">
        <div>
          <input
            value={todayGoal}
            onChange={(e) => setTodayGoal(e.target.value)}
            placeholder="오늘의 목표"
            maxLength={30}
            className="mb-4 p-9 text-xl font-bold"
          />

          <div className="m-auto flex w-142 flex-col">
            <label htmlFor="todo">할 일 목록</label>
            <div className="relative flex bg-gray-400 px-6 py-4">
              <input
                id="todo"
                maxLength={30}
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="할 일을 추가해 주세요."
              />
              <button onClick={handleAddTodo} className="absolute right-6">
                추가
              </button>
            </div>

            <div className="scrollbar-hide mt-9 flex h-115 w-142 flex-col gap-3 overflow-y-auto">
              {todos.map((todo, i) => (
                <TodoItem key={i} todo={todo} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 p-9">
          <button
            className="text-primary-blue h-12 w-21 cursor-pointer rounded bg-gray-50 px-4 py-3 text-[18px] leading-[22px] font-semibold"
            onClick={onClose}
          >
            취소
          </button>
          <button
            disabled={isDisabled}
            onClick={createTimer}
            className={`ronuded w-[146px] cursor-pointer px-4 py-3 text-[18px] leading-[22px] font-semibold ${isDisabled ? "disabled-button" : "bg-primary-blue/10 text-primary-blue"}`}
          >
            타이머 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
