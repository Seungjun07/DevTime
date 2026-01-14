import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { useDeleteTimer } from "../hooks/mutations/timer/use-delete-timer";
import { useProfileData } from "../hooks/queries/use-profile-data";
import { getAccessToken } from "../utils/token";
import { API_BASE_URL } from "../api/api";
import { type SplitTime, type TaskModalType } from "../types";

import StudyTimer from "../components/timer/study-timer";
import TaskModalLayout from "../components/modal/task/task-modal-layout";
import CreateTasks from "../components/modal/task/create-tasks";
import Dialog from "../components/common/Dialog/Dialog";
// import ManageTodos from "../components/modal/task/manage-todos";
// import StopTodosModal from "../components/modal/task/stop-todos-modal";

import startIcon from "./../assets/Start.png";
import enabledStartIcon from "./../assets/Start-enabled.png";
import pauseIcon from "./../assets/Pause.png";
import enabledPauseIcon from "./../assets/Pause-enabled.png";
import finishIcon from "./../assets/Finish.png";
import enabledFinishIcon from "./../assets/Finish-enabled.png";
import resetIcon from "./../assets/Reset.png";
import todoIcon from "./../assets/TODO.png";
import { useTimer } from "../hooks/use-timer";
import { useModalStore } from "../store/modals";

// type TaskModalType = "CREATE" | "UPDATE" | "FINISH" | null;

export default function IndexPage() {
  // const [taskModal, setTaskModal] = useState<TaskModalType>(null);
  const navigate = useNavigate();

  const isLogin = useAuthStore((state) => state.isLogin);
  const accessToken = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.actions.logout);

  const { openConfirmModal, openCustomModal } = useModalStore();
  const [isCreateTodosModalOpen, setIsCreateTodosModalOpen] = useState(false);
  const [isUpdateTodosModalOpen, setIsUpdateTodosModalOpen] = useState(false);
  const [isStopTodosModalOpen, setIsStopTodosModalOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const storedTimer = localStorage.getItem("timerId");
  const timerId = storedTimer ? JSON.parse(storedTimer) : null;

  const {
    seconds,
    isRunning,
    splitTimes,
    fetchTimer,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useTimer(timerId);

  useEffect(() => {
    if (!accessToken) {
      logout();
    }
  }, []);

  function handleStartTimerClick() {
    if (!isLogin) {
      openConfirmModal({
        title: "로그인이 필요합니다.",
        description:
          "DevTime을 사용하려면 로그인이 필요합니다. 로그인 페이지로 이동할까요?",
        onConfirm: () => {
          navigate("/sign-in");
        },

        cancelText: "취소",
        confirmText: "로그인하기",
      });
      return;
    }

    openCustomModal({ type: "START_TIMER" });
  }

  function handleTaskListClick() {
    openCustomModal({ type: "MANAGE_TASK" });
  }

  const formatTime = (sec: number) => {
    const hour = Math.floor(sec / 3600)
      .toString()
      .padStart(2, "0");
    const minute = Math.floor((sec % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");

    return { hour, minute, s };
  };

  const { hour, minute, s } = formatTime(seconds);

  const { mutate: deleteTimer, isPending: isDeleteTimerPending } =
    useDeleteTimer();

  function handleResetClick() {
    resetTimer();
    deleteTimer(timerId);
  }

  function handleFinishClick() {
    openCustomModal({ type: "FINISH_TIMER" });
  }

  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useProfileData();

  if (isLoading) return <div>로딩 중...</div>;
  return (
    <div>
      {isLogin ? (
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
        <StudyTimer hour={hour} minute={minute} s={s} />

        <div className="relative flex items-center gap-[134px]">
          <div className="m-auto flex items-end justify-end gap-20">
            <button
              className="cursor-pointer"
              onClick={() => {
                if (timerId) {
                  startTimer();
                } else {
                  handleStartTimerClick();
                }
              }}
            >
              <img
                src={isRunning ? enabledStartIcon : startIcon}
                alt="타이머 시작 버튼"
              />
            </button>
            <button
              className="cursor-pointer"
              onClick={pauseTimer}
              disabled={!timerId}
            >
              <img
                src={isRunning ? pauseIcon : enabledPauseIcon}
                alt="타이머 중지 버튼"
              />
            </button>
            <button
              className="cursor-pointer"
              onClick={handleFinishClick}
              disabled={!timerId}
            >
              <img
                src={seconds ? finishIcon : enabledFinishIcon}
                alt="타이머 종료 버튼"
              />
            </button>
          </div>

          {timerId && (
            <div className="absolute right-0 flex gap-6">
              <button
                onClick={handleTaskListClick}
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
                onClick={() => {
                  handleResetClick();
                  setIsCreateTodosModalOpen(false);
                }}
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

      {/* {!timerId && isCreateTodosModalOpen && (
        <TaskModalLayout>
          <CreateTasks
            onClose={() => setIsCreateTodosModalOpen(false)}
            onStart={() => startTimer()}
            type="CREATE"
          />
        </TaskModalLayout>
      )} */}
      {/* {isUpdateTodosModalOpen && (
        <TaskModalLayout>
          <ManageTodos
            onClose={() => setIsUpdateTodosModalOpen(false)}
            type="UPDATE"
          />
        </TaskModalLayout>
      )} */}

      {/* {isStopTodosModalOpen && (
        <TaskModalLayout>
          <StopTodosModal
            onClose={() => setIsStopTodosModalOpen(false)}
            splitTimes={splitTimes}
            deleteTimer={resetTimer}
            type="FINISH"
          />
        </TaskModalLayout>
      )} */}
    </div>
  );
}
