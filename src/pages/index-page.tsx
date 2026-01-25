import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "../store/modals";

import { useProfileQuery } from "../features/user/hooks/queries/useProfileQuery";
import TimerControls from "@/features/study/timer/components/timer-controls";
import TimerDisplay from "@/features/study/timer/components/timer-display";
import { useAuthStore } from "@/store/auth";
import { useTimerStore } from "@/store/timer";
import { useUpdateTimer } from "@/features/study/timer/hooks/useUpdateTimer";
import { splitTimeByDate } from "@/utils/split-time-by-date";
import { useDeleteTimer } from "@/features/study/timer/hooks/useDeleteTimer";
import { useTimerQuery } from "@/features/study/timer/hooks/useTimerQuery";

export default function IndexPage() {
  const navigate = useNavigate();

  const isLogin = useAuthStore((state) => state.isLogin);
  const accessToken = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.actions.logout);

  const { openConfirmModal, openCustomModal } = useModalStore();

  const {
    timerId,
    seconds,
    isRunning,
    startTime,
    setTimerInfo,
    start,
    pause,
    resume,
    setSplitTimes,
    setSplitTimesOnly,
  } = useTimerStore();

  const { data: timerData } = useTimerQuery();
  const { mutate: updateTimer } = useUpdateTimer();
  const { mutate: deleteTimer } = useDeleteTimer();
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (!accessToken) {
      logout();
    }
  }, []);

  useEffect(() => {
    if (!timerData) return;

    // localStorage에 timerId 존재(새로고침한 경우)
    if (timerId === timerData.timerId && seconds > 0) {
      setSplitTimesOnly(timerData.splitTimes);
    } else {
      // 새로운 타이머 or localStorage 비었음
      if (timerData.splitTimes && timerData.splitTimes.length > 0) {
        setSplitTimes(timerData.splitTimes);
      }
    }

    setTimerInfo(timerData);
  }, [timerData]);

  useEffect(() => {
    if (!startTime || !isRunning) return;

    const poll = () => {
      const now = new Date().toISOString();
      const newSplitTimes = splitTimeByDate(startTime, now);

      updateTimer(newSplitTimes);
    };

    pollingRef.current = setInterval(poll, 10 * 60 * 1000);

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [isRunning, startTime]);

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

    if (timerId && !isRunning) {
      resume();
      return;
    }

    if (!timerId) {
      openCustomModal({ type: "START_TIMER" });
      return;
    }
  }

  function handleTaskList() {
    openCustomModal({ type: "MANAGE_TASK" });
  }

  function handleResetClick() {
    deleteTimer();
    if (pollingRef.current) clearInterval(pollingRef.current);
  }

  function handleFinishClick() {
    openCustomModal({ type: "FINISH_TIMER" });
  }

  function handlePauseClick() {
    if (!isRunning || !startTime) return;

    const endTime = new Date().toISOString();
    const newSplitTimes = splitTimeByDate(startTime, endTime);

    updateTimer(newSplitTimes);
    pause();

    if (pollingRef.current) clearInterval(pollingRef.current);
  }

  const { data: profile } = useProfileQuery();

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
          timerId={timerId ?? ""}
          seconds={seconds}
          isRunning={isRunning}
          onStart={handleStartTimer}
          onPause={handlePauseClick}
          onFinish={handleFinishClick}
          onReset={handleResetClick}
          onOpenTask={handleTaskList}
        />
      </div>
    </div>
  );
}
