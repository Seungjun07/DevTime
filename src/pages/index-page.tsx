import startIcon from "./../assets/Start.png";
import enabledStartIcon from "./../assets/Start-enabled.png";
import pauseIcon from "./../assets/Pause.png";
import enabledPauseIcon from "./../assets/Pause-enabled.png";
import finishIcon from "./../assets/Finish.png";
import enabledFinishIcon from "./../assets/Finish-enabled.png";
import { useEffect, useState } from "react";
import tagIcon from "./../assets/tag.png";
import editIcon from "./../assets/edit.png";
import trashIcon from "./../assets/trash.png";
import TodoItem from "../components/todo-item";

export default function IndexPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [todayGoal, setTodayGoal] = useState("");
  const [todos, setTodos] = useState<string[]>([]);
  const [todo, setTodo] = useState("");

  const isDisabled = todos.length < 1 || !todayGoal.trim();

  function handleAddTodo() {
    if (todo.trim() === "") return;

    setTodos([...todos, todo]);
    setTodo("");
  }

  // async function createTimer() {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/timers`,
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async function fetchTimer() {
  //   const isLogin = JSON.parse(localStorage.getItem("token") || "{}");

  //   if (isLogin.isLogin) {
  //     const response = await fetch("https://devtime.prokit.app/api/timers");

  //     console.log(response);
  //     const data = await response.json();
  //     console.log(data);
  //   }
  // }

  // useEffect(() => {
  //   fetchTimer();
  // }, []);

  return (
    <div>
      <div className="text-center text-7xl">WELCOME</div>
      <div className="pretendard pt-2.5 pb-[50px] text-center text-[10px] leading-3 font-normal">
        DevTime을 사용하려면 로그인이 필요합니다
      </div>

      <div className="text-primary-blue flex justify-center gap-4">
        <div className="border-primary-blue from-primary-blue/0 to-primary-blue/20 h-[300px] w-[260px] rounded-xl border bg-linear-to-br from-0% to-100% px-2">
          <div className="digit-time">00</div>
          <div className="py-9 text-center">HOURS</div>
        </div>
        <p>:</p>
        <div className="border-primary-blue from-primary-blue/0 to-primary-blue/20 h-[300px] w-[260px] rounded-xl border bg-linear-to-br from-0% to-100% px-2">
          <div className="digit-time">00</div>
          <div className="py-9 text-center">MINUTES</div>
        </div>
        <p>:</p>
        <div className="border-primary-blue from-primary-blue/0 to-primary-blue/20 h-[300px] w-[260px] rounded-xl border bg-linear-to-br from-0% to-100% px-2">
          <div className="digit-time">00</div>
          <div className="py-9 text-center">SECONDS</div>
        </div>
      </div>

      <div className="m-auto mt-20 flex justify-center gap-20">
        <img
          onClick={() => setIsOpen(true)}
          src={startIcon}
          alt="타이머 시작 버튼"
        />
        <img src={enabledPauseIcon} alt="타이머 중지 버튼" />
        <img src={enabledFinishIcon} alt="타이머 종료 버튼" />
      </div>

      {isOpen && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          {/* 모달 박스 */}
          <div className="flex h-[828px] w-160 flex-col justify-between rounded-lg bg-white shadow-lg">
            <div>
              <input
                value={todayGoal}
                onChange={(e) => setTodayGoal(e.target.value)}
                placeholder="오늘의 목표"
                className="mb-4 p-9 text-xl font-bold"
              />

              <div className="m-auto flex w-142 flex-col">
                <label htmlFor="todo">할 일 목록</label>
                <div className="relative flex bg-gray-400 px-6 py-4">
                  <input
                    id="todo"
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
                onClick={() => setIsOpen(false)}
              >
                취소
              </button>
              <button
                disabled={isDisabled}
                className={`ronuded w-[146px] cursor-pointer px-4 py-3 text-[18px] leading-[22px] font-semibold ${isDisabled ? "disabled-button" : "bg-primary-blue/10 text-primary-blue"}`}
              >
                타이머 시작하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
