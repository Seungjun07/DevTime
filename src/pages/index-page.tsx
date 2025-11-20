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
import { fetchWithAuth } from "../api/auth";
import TodosModal from "../components/modal/todos-modal";

export default function IndexPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [todayGoal, setTodayGoal] = useState("");
  const [todos, setTodos] = useState<string[]>([]);
  const [todo, setTodo] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const isDisabled = todos.length < 1 || !todayGoal.trim();

  function handleAddTodo() {
    if (todo.trim() === "") return;

    setTodos([...todos, todo]);
    setTodo("");
  }

  const storedTimer = localStorage.getItem("timerId");
  const timerId = storedTimer ? JSON.parse(storedTimer) : null;

  async function deleteTimer() {
    const data = await fetchWithAuth(
      `https://devtime.prokit.app/api/timers/${timerId}`,
      "DELETE",
    );

    localStorage.removeItem("timerId");
    console.log(data);
  }

  async function fetchTimer() {
    setIsLoading(true);

    try {
      const data = await fetchWithAuth(
        "https://devtime.prokit.app/api/timers",
        "GET",
      );

      console.log("현재 타이머", data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "NOT_LOGGED_IN") {
          setShowLoginModal(true);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTimer();
  }, []);

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div>
      {/* {showLoginModal&&<} */}
      <h1 className="text-center text-7xl">WELCOME</h1>
      <p className="pretendard pt-2.5 pb-[50px] text-center text-[10px] leading-3 font-normal">
        DevTime을 사용하려면 로그인이 필요합니다
      </p>

      <div className="m-auto flex w-258 flex-col gap-20">
        <div className="text-primary-blue flex justify-between gap-12">
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

        <div className="relative flex items-center gap-[134px]">
          <div className="m-auto flex items-end justify-end gap-20">
            <img
              onClick={() => setIsOpen(true)}
              src={startIcon}
              alt="타이머 시작 버튼"
            />
            <img src={enabledPauseIcon} alt="타이머 중지 버튼" />
            <img
              onClick={deleteTimer}
              src={enabledFinishIcon}
              alt="타이머 종료 버튼"
            />
          </div>

          {timerId && (
            <div className="absolute right-0 flex gap-6">
              <div className="h-16 w-16 rounded-4xl bg-white p-2">
                할 일 목록
              </div>
              <div className="h-16 w-16 rounded-4xl bg-white p-2">초기화</div>
            </div>
          )}
        </div>
      </div>

      {isOpen && <TodosModal onClick={() => setIsOpen(false)} />}
    </div>
  );
}
