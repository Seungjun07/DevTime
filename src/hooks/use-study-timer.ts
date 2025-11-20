import { useState, useRef, useEffect } from "react";
type PauseRange = {
  start: number; // 일시정지 시작 timestamp
  end: number | null; // 일시정지 종료 timestamp
};

type SplitTime = {
  date: string; // '2025-03-03'
  duration: number; // 밀리초 단위
};
export function useStudyTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [pauseRanges, setPauseRanges] = useState<PauseRange[]>([]);
  const pauseStartRef = useRef<number | null>(null);

  const [now, setNow] = useState(Date.now()); // 실시간 시간 갱신용

  // 1초마다 now 업데이트
  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning]);

  // 타이머 시작
  const start = () => {
    if (isRunning) return;
    const now = Date.now();
    setStartTime(now);
    setIsRunning(true);
  };

  // 일시정지
  const pause = () => {
    if (!isRunning) return;
    pauseStartRef.current = Date.now();
    setIsRunning(false);
  };

  // 일시정지 해제
  const resume = () => {
    const pauseStart = pauseStartRef.current;
    if (!pauseStart) return;

    const pauseEnd = Date.now();
    setPauseRanges((prev) => [...prev, { start: pauseStart, end: pauseEnd }]);

    pauseStartRef.current = null;
    setIsRunning(true);
  };

  // 타이머 종료 → 날짜별 split 생성
  const stop = () => {
    const endTime = Date.now();

    // 마지막으로 pause 중이었다면 종료시점으로 처리
    if (pauseStartRef.current) {
      setPauseRanges((prev) => [
        ...prev,
        { start: pauseStartRef.current!, end: endTime },
      ]);
      pauseStartRef.current = null;
    }

    const result = calculateSplitTimes(startTime!, endTime, pauseRanges);

    // 스테이트 리셋
    setIsRunning(false);
    setStartTime(null);
    setPauseRanges([]);

    return result; // splitTimes 배열 반환
  };

  return { isRunning, start, pause, resume, stop, now };
}

function calculateSplitTimes(start: number, end: number, pauses: PauseRange[]) {
  // 1) 실제 공부한 시간 구간을 생성 (pause를 제외한 구간)
  const segments: { start: number; end: number }[] = [];
  let pointer = start;

  pauses.forEach((p) => {
    if (p.start > pointer) {
      segments.push({ start: pointer, end: p.start });
    }
    pointer = p.end!;
  });

  // 마지막 공부 구간
  if (pointer < end) segments.push({ start: pointer, end });

  // 2) 각 세그먼트를 날짜별로 split
  const dateMap: Record<string, number> = {};

  segments.forEach((seg) => {
    let s = seg.start;
    const e = seg.end;

    while (s < e) {
      const startDate = new Date(s);
      const endOfDay = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        23,
        59,
        59,
        999,
      ).getTime();

      const segmentEnd = Math.min(endOfDay, e);
      const duration = segmentEnd - s;

      const key = startDate.toISOString().slice(0, 10); // YYYY-MM-DD 형식

      dateMap[key] = (dateMap[key] || 0) + duration;

      s = segmentEnd + 1;
    }
  });

  // 3) splitTimes 배열로 변환
  return Object.keys(dateMap).map((date) => ({
    date,
    duration: dateMap[date],
  }));
}
