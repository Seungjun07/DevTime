import { useEffect, useRef } from "react";
import { useTimerStore } from "../../../../store/timer";
import type { Task } from "../../study-log";
import { splitTimeByDate } from "../../../../utils/split-time-by-date";
import { useUpdateTimer } from "./useUpdateTimer";
import { useCreateTimer } from "./useCreateTimer";
import { timerStorage } from "../../../../lib/timerStorage";
import { useTimerQuery } from "./useTimerQuery";
import { useDeleteTimer } from "./useDeleteTimer";
import { useFinishTimer } from "./useFinishTimer";

export function useTimer() {
  const {
    seconds,
    startTime,
    studyLogId,
    splitTimes,
    isRunning,
    timerId,
    setSeconds,
    setTimerIds,
    setIsRunning,
    setStartTime,
    addSeconds,
    setSplitTimes,
    addSplitTimes,
    resetAll,
  } = useTimerStore();
  const { data: timerData, isLoading, error } = useTimerQuery(isRunning);
  const { mutateAsync: createTimerMutate } = useCreateTimer();
  const { mutateAsync: updateTimerMutate } = useUpdateTimer();
  const { mutateAsync: deleteTimerMutate } = useDeleteTimer();
  const { mutateAsync: finishTimerMutate } = useFinishTimer();

  const intervalRef = useRef<number | null>(null);
  const pollingRef = useRef<number | null>(null); //10분 주기
  const startTimeRef = useRef<Date | null>(null);

  // polling
  const startPolling = () => {
    if (pollingRef.current) return;

    pollingRef.current = window.setInterval(
      () => {
        updateTimer();
      },
      10 * 60 * 1000,
    );
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  // 인터벌 타이머
  const startIntervalTimer = () => {
    if (intervalRef.current) return;

    intervalRef.current = window.setInterval(() => {
      addSeconds(1);
    }, 1000);
  };

  const stopIntervalTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // 타이머 업데이트
  async function updateTimer() {
    if (!timerId) return;

    try {
      await updateTimerMutate({ timerId, splitTimes });
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTimer() {
    if (!timerData) return;

    setSplitTimes(timerData.splitTimes || []);

    if (timerData.startTime && timerData.timerId) {
      setTimerIds(timerData.timerId, timerData.studyLogId);

      const lastUpdate = new Date(timerData.lastUpdateTime);
      const start = new Date(timerData.startTime);
      const now = new Date();

      if (now > lastUpdate) {
        const newSplitTimes = splitTimeByDate(lastUpdate, now);
        addSplitTimes(newSplitTimes);
      }

      startTimeRef.current = now;
      const elapsedMs = now.getTime() - start.getTime();
      setSeconds(Math.floor(elapsedMs / 1000));
      setIsRunning(true);
      startIntervalTimer();
      startPolling();
    }
  }

  // 타이머 시작
  const startTimer = async (todayGoal: string, tasks: Task[]) => {
    if (!todayGoal.trim() || tasks.length === 0) return;

    try {
      const data = await createTimerMutate({ todayGoal, tasks });

      timerStorage.setTimerData(data.timerId, data.studyLogId);
      setTimerIds(data.timerId, data.studyLogId);

      const start = new Date(data.startTime);
      startTimeRef.current = start;
      setStartTime(start);
      setSeconds(0);
      setSplitTimes([]);
      setIsRunning(true);

      startIntervalTimer();
      startPolling();
    } catch (error) {
      console.log("타이머 시작 실패", error);
    }
  };

  const deleteTimer = async () => {
    if (!timerId) return;

    try {
      await deleteTimerMutate(timerId);
      stopIntervalTimer();
      stopPolling();
    } catch (error) {
      console.error("타이머 삭제 실패", error);
    }
  };

  const finishTimer = async (review: string, tasks: Task[]) => {
    if (!timerId) return;

    try {
      await finishTimerMutate({ timerId, splitTimes, review, tasks });

      stopIntervalTimer();
      stopPolling();
    } catch (error) {
      console.error("타이머 종료 실패", error);
    }
  };

  const resumeTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      startIntervalTimer();
      startPolling();
    }
  };

  // 일시 정지
  const pauseTimer = async () => {
    if (isRunning && startTime) {
      const now = new Date();
      const newSplitTimes = splitTimeByDate(startTime, now);

      addSplitTimes(newSplitTimes);
      startTimeRef.current = null;
    }

    setIsRunning(false);
    setStartTime(null);
    stopIntervalTimer();
    stopPolling();

    await updateTimer();
  };

  const resetTimer = () => {
    stopIntervalTimer();
    stopPolling();
    resetAll();
  };

  useEffect(() => {
    const timerData = timerStorage.getTimerData();
    if (timerData) {
      setTimerIds(timerData.timerId, timerData.studyLogId);
    }
  }, [setTimerIds]);

  useEffect(() => {
    fetchTimer();
  }, [timerData]);

  useEffect(() => {
    return () => {
      stopIntervalTimer();
      stopPolling();
    };
  }, []);

  return {
    timerId,
    seconds,
    isRunning,
    splitTimes,
    studyLogId,
    fetchTimer,
    startTimer,
    resumeTimer,
    deleteTimer,
    finishTimer,
    pauseTimer,
    resetTimer,
  };
}
