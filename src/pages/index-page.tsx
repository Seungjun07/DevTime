import startIcon from "./../assets/Start.png";
import enabledStartIcon from "./../assets/Start-enabled.png";
import pauseIcon from "./../assets/Pause.png";
import enabledPauseIcon from "./../assets/Pause-enabled.png";
import finishIcon from "./../assets/Finish.png";
import enabledFinishIcon from "./../assets/Finish-enabled.png";
import { useEffect, useRef, useState } from "react";
import { deleteToken, getAccessToken } from "../utils/token";
import { type SplitTime, type MyProfile } from "../types";
import resetIcon from "./../assets/Reset.png";
import todoIcon from "./../assets/TODO.png";
import ManageTodos from "../components/modal/task/manage-todos";
import StudyTimer from "../components/timer/study-timer";
import StopTodosModal from "../components/modal/task/stop-todos-modal";
import TaskModalLayout from "../components/modal/task/task-modal-layout";
import CreateTasks from "../components/modal/task/create-tasks";

export default function IndexPage() {
  const [isCreateTodosModalOpen, setIsCreateTodosModalOpen] = useState(false);
  const [isUpdateTodosModalOpen, setIsUpdateTodosModalOpen] = useState(false);
  const [isStopTodosModalOpen, setIsStopTodosModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const storedTimer = localStorage.getItem("timerId");
  const timerId = storedTimer ? JSON.parse(storedTimer) : null;

  const [timer, setTimer] = useState();
  const [startTime, setStartTime] = useState<Date | null>(null);

  async function deleteTimer() {
    try {
      if (!accessToken) throw new Error("로그인 필요");
      const response = await fetch(
        `https://devtime.prokit.app/api/timers/${timerId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!response.ok) throw new Error("타이머 삭제 실패");
      const data = response.json();
      console.log(data);
      resetTimer();
    } catch (error) {
      console.log(error);
    }
  }
  const [profile, setProfile] = useState<MyProfile>();
  const accessToken = getAccessToken();
  async function getProfile() {
    try {
      if (!accessToken) throw new Error("로그인 필요");

      let response = await fetch("https://devtime.prokit.app/api/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        const tokenRefreshed = await refreshAccessToken();
        if (tokenRefreshed) {
          response = await fetch("https://devtime.prokit.app/api/profile", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        } else {
          deleteToken();
          throw new Error("로그인 필요");
        }
      }

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

  async function refreshAccessToken() {
    try {
      const response = await fetch(
        "https://devtime.prokit.app/api/auth/refresh",
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!response.ok) return false;

      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

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

      if (!response.ok) {
        if (response.status === 404) {
          localStorage.removeItem("timerId");
        }
        throw new Error("타이머 불러오기 실패");
      }

      const data = await response.json();
      console.log("현재 타이머", data);
      setTimer(data);

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
    } finally {
      setIsLoading(false);
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
    try {
      const accessToken = getAccessToken();
      if (!accessToken) throw new Error("로그인 필요");

      const response = await fetch(
        `https://devtime.prokit.app/api/timers/${timerId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            timerId,
            splitTimes,
          }),
        },
      );

      if (!response.ok) throw new Error("타이머 불러오기 실패");

      const data = await response.json();
      console.log("일시정지 타이머", data);
    } catch (error) {
      console.log(error);
    }
  }

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const [splitTimes, setSplitTimes] = useState<SplitTime[]>([]);
  const pollingRef = useRef<number | null>(null); //10분 주기

  // // yyyy-mm-dd key 생성
  // const getDateKey = (date = new Date()) => {
  //   return date.toISOString().split("T")[0];
  // };

  // splitTimes 누적
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

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      const now = new Date();
      setStartTime(now);
      intervalRef.current = window.setInterval(
        () => setSeconds((prev) => prev + 1),
        1000,
      );
      startPolling();
    }
  };

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
    clearInterval(intervalRef.current!);
    setIsRunning(false);
    setSeconds(0);
    localStorage.removeItem("timerId");
    localStorage.removeItem("studyLogId");
  };

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

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (isLoading) return <div>로딩 중...</div>;
  return (
    <div>
      {/* {!accessToken && (
        <SignInAlertModal handleConfirm={() => setShowLoginModal(false)} />
      )} */}
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
        <StudyTimer hour={hour} minute={minute} s={s} />

        <div className="relative flex items-center gap-[134px]">
          <div className="m-auto flex items-end justify-end gap-20">
            <img
              onClick={() => {
                if (timerId) {
                  startTimer();
                } else {
                  setIsCreateTodosModalOpen(true);
                }
              }}
              src={isRunning ? enabledStartIcon : startIcon}
              alt="타이머 시작 버튼"
            />
            <img
              src={isRunning ? pauseIcon : enabledPauseIcon}
              onClick={pauseTimer}
              alt="타이머 중지 버튼"
            />
            <img
              onClick={() => {
                setIsStopTodosModalOpen(true);

                // resetTimer();
              }}
              src={seconds ? finishIcon : enabledFinishIcon}
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
                onClick={() => {
                  deleteTimer();
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

      {!timerId && isCreateTodosModalOpen && (
        <TaskModalLayout>
          <CreateTasks
            onClose={() => setIsCreateTodosModalOpen(false)}
            onStart={() => startTimer()}
            type="CREATE"
          />
        </TaskModalLayout>
      )}
      {isUpdateTodosModalOpen && (
        <TaskModalLayout>
          <ManageTodos
            onClose={() => setIsUpdateTodosModalOpen(false)}
            type="UPDATE"
          />
        </TaskModalLayout>
      )}

      {isStopTodosModalOpen && (
        <TaskModalLayout>
          <StopTodosModal
            onClose={() => setIsStopTodosModalOpen(false)}
            splitTimes={splitTimes}
            deleteTimer={resetTimer}
            type="FINISH"
          />
        </TaskModalLayout>
      )}
      {/* {isOpen && <CreateTodos onClick={() => setIsOpen(false)} />} */}
    </div>
  );
}
