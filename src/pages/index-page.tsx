import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { useDeleteTimer } from "../hooks/mutations/timer/use-delete-timer";
import { useProfileData } from "../hooks/queries/use-profile-data";

import StudyTimer from "../components/timer/timer-display";

import { useTimer } from "../hooks/use-timer";
import { useModalStore } from "../store/modals";
import TimerDisplay from "../components/timer/timer-display";
import TimerControls from "../components/timer/timer-controls";

export default function IndexPage() {
  const navigate = useNavigate();

  const isLogin = useAuthStore((state) => state.isLogin);
  const accessToken = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.actions.logout);

  const { openConfirmModal, openCustomModal } = useModalStore();

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

  // 타이머 컨트롤 함수
  function handleStartTimer() {
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

    if (timerId) {
      startTimer();
      return;
    }

    openCustomModal({ type: "START_TIMER" });
  }

  function handleTaskList() {
    openCustomModal({ type: "MANAGE_TASK" });
  }

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
        <TimerDisplay time={seconds} />
        <TimerControls
          seconds={seconds}
          isRunning={isRunning}
          onStart={handleStartTimer}
          onPause={pauseTimer}
          onFinish={handleFinishClick}
          onReset={handleResetClick}
          onOpenTask={handleTaskList}
        />
      </div>
    </div>
  );
}
