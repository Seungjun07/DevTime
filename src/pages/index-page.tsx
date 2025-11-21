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
import TodosModal from "../components/modal/todo/todos-modal";
import { getAccessToken } from "../utils/token";
import { type MyProfile } from "../types";
import resetIcon from "./../assets/Reset.png";
import todoIcon from "./../assets/TODO.png";
import CreateTodos from "../components/modal/todo/create-todos";
import ManageTodos from "../components/modal/todo/manage-todos";

export default function IndexPage() {
  const [isCreateTodosModalOpen, setIsCreateTodosModalOpen] = useState(false);
  const [isUpdateTodosModalOpen, setIsUpdateTodosModalOpen] = useState(false);
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
  const [profile, setProfile] = useState<MyProfile>();
  const accessToken = getAccessToken();
  async function getProfile() {
    try {
      if (!accessToken) throw new Error("로그인 필요");

      const response = await fetch("https://devtime.prokit.app/api/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) throw new Error("프로필 불러오기 실패");
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  async function fetchTimer() {
    setIsLoading(true);

    try {
      const accessToken = getAccessToken();
      if (!accessToken) throw new Error("로그인 필요");

      const response = await fetch("https://devtime.prokit.app/api/timers", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("타이머 불러오기 실패");
      const data = await response.json();
      console.log("현재 타이머", data);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTimer();
  }, []);

  async function getTodos() {
    try {
      const studyLogId = JSON.parse(localStorage.getItem("studyLogId") || "");

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
      console.log("현재 할일", data);
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div>
      {/* {showLoginModal&&<} */}
      {accessToken ? (
        <h1 className="pb-20 text-center text-7xl">
          {profile?.profile?.goal
            ? `${profile.profile.goal}`
            : "오늘도 열심히 달려봐요!"}
        </h1>
      ) : (
        <>
          <h1 className="text-center text-7xl">WELCOME</h1>
          <p className="pretendard pt-2.5 pb-[50px] text-center text-[10px] leading-3 font-normal">
            DevTime을 사용하려면 로그인이 필요합니다
          </p>
        </>
      )}

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
              onClick={() => setIsCreateTodosModalOpen(true)}
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
              <button
                onClick={() => setIsUpdateTodosModalOpen(true)}
                title="할 일 목록"
                className="h-16 w-16 cursor-pointer rounded-4xl bg-white p-2"
              >
                <img
                  src={todoIcon}
                  className="object-cover"
                  alt="할 일 목록 아이콘"
                />
              </button>
              <button
                title="초기화"
                className="h-16 w-16 cursor-pointer rounded-4xl bg-white p-2"
              >
                <img
                  src={resetIcon}
                  className="object-cover"
                  alt="초기화 아이콘"
                />
              </button>
            </div>
          )}
        </div>
      </div>

      {isCreateTodosModalOpen && (
        <TodosModal onClick={() => setIsCreateTodosModalOpen(false)} />
      )}
      {isUpdateTodosModalOpen && (
        <ManageTodos onClick={() => setIsUpdateTodosModalOpen(false)} />
      )}
      {/* {isOpen && <CreateTodos onClick={() => setIsOpen(false)} />} */}
    </div>
  );
}
