import { useEffect, useRef, useState } from "react";
import type { SplitTime, Task } from "../types";
import { getAccessToken } from "../utils/token";
import { API_BASE_URL } from "../api/api";
import { createTimer } from "../api/timer";
import { useTimerStore } from "../store/timer";

export function useTimer() {
  const timerId = JSON.parse(localStorage.getItem("timerId")!);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [splitTimes, setSplitTimes] = useState<SplitTime[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);

  // const { startTimer } = useTimerStore();
  const intervalRef = useRef<number | null>(null);
  const pollingRef = useRef<number | null>(null); //10분 주기

  // 날짜별 시간 누적
  const addSplitTime = (date: Date, ms: number) => {
    setSplitTimes((prev) => [
      ...prev,
      { date: date.toISOString(), timeSpent: ms },
    ]);
  };

  // 날짜별로 시간 분리
  const splitByDate = (start: Date, end: Date) => {
    // 현재 계산 중인 시간 시작점
    let current = new Date(start);

    while (current < end) {
      // 현재 날짜의 마지막 23:59:59.999
      const endOfDay = new Date(current);
      endOfDay.setHours(23, 59, 59, 999);

      // 오늘 날짜 끝과 종료 시점 중 작은 값
      const chunkEnd = end < endOfDay ? end : endOfDay;
      const diffMs = chunkEnd.getTime() - current.getTime();

      // current 기준 날짜에 해당하는 시간 누적
      addSplitTime(current, diffMs);

      // 다음 날짜로 이동
      current = new Date(chunkEnd.getTime() + 1);
    }
  };

  async function fetchTimer() {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) throw new Error("로그인 필요");

      const response = await fetch(`${API_BASE_URL}/api/timers`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          localStorage.removeItem("timerId");
        }
        throw new Error("타이머 불러오기 실패");
      }

      const data = await response.json();

      setSplitTimes(data.splitTimes || []);

      if (data.startTime) {
        const lastUpdate = new Date(data.lastUpdateTime);
        const start = new Date(data.startTime);
        const now = new Date();

        if (now > lastUpdate) splitByDate(lastUpdate, now);

        setStartTime(now);
        const elapsedMs = now.getTime() - start.getTime();
        setSeconds(Math.floor(elapsedMs / 1000));
        setIsRunning(true);
        intervalRef.current = window.setInterval(
          () => setSeconds((prev) => prev + 1),
          1000,
        );
        startPolling();
      }
    } catch (error: unknown) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTimer();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      stopPolling();
    };
  }, []);

  async function updateTimer() {
    if (!timerId) return;
    try {
      const accessToken = getAccessToken();
      if (!accessToken) throw new Error("로그인 필요");

      const response = await fetch(`${API_BASE_URL}/api/timers/${timerId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          splitTimes,
        }),
      });

      if (!response.ok) throw new Error("타이머 불러오기 실패");
    } catch (error) {
      console.log(error);
    }
  }

  // polling
  const startPolling = () => {
    if (!pollingRef.current) {
      pollingRef.current = setInterval(() => updateTimer(), 10 * 60 * 1000);
    }
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  const startTimer = async (todayGoal: string, tasks: Task[]) => {
    if (!todayGoal.trim() || tasks.length === 0) return;

    try {
      const data = await createTimer(todayGoal, tasks);
      localStorage.setItem("timerId", JSON.stringify(data.timerId));
      localStorage.setItem("studyLogId", JSON.stringify(data.studyLogId));

      const start = new Date(data.startTime);
      setStartTime(start);
      setSeconds(0);
      setIsRunning(true);

      intervalRef.current = window.setInterval(
        () => setSeconds((prev) => prev + 1),
        1000,
      );
      startPolling();
    } catch (error) {
      console.log("타이머 시작 실패", error);
    }
  };

  const resumeTimer = () => {
    if (!isRunning) {
      setIsRunning(true);

      intervalRef.current = window.setInterval(
        () => setSeconds((prev) => prev + 1),
        1000,
      );
      startPolling();
    }
  };
  // if (!isRunning) {
  //   const now = new Date();
  //   setStartTime(now);
  //   intervalRef.current = window.setInterval(
  //     () => setSeconds((prev) => prev + 1),
  //     1000,
  //   );
  // }
  // const pause = async ()=>{

  // }
  const pauseTimer = async () => {
    if (isRunning && startTime) {
      const now = new Date();
      splitByDate(startTime, now);
    }
    setIsRunning(false);
    setStartTime(null);
    if (intervalRef.current) clearInterval(intervalRef.current!);

    stopPolling();

    await updateTimer();
  };

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current!);
    setIsRunning(false);
    setSeconds(0);
    setSplitTimes([]);
    setStartTime(null);
    localStorage.removeItem("timerId");
    localStorage.removeItem("studyLogId");
  };

  return {
    seconds,
    isRunning,
    splitTimes,
    fetchTimer,
    startTimer,
    resumeTimer,
    pauseTimer,
    resetTimer,
    setSplitTimes,
  };
}
