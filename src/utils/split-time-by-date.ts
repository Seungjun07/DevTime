/**
 * 날짜별로 시간 분리
 * @param start : 시작 날짜
 * @param end : 종료 날짜
 */

import type { SplitTimes } from "@/features/study/timer";

export function splitTimeByDate(
  startTime: string,
  endTime: string,
): SplitTimes[] {
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (end <= start) return [];

  const splitTime: SplitTimes[] = [];
  let current = start;

  while (current < end) {
    const nextDayStart = new Date(current);
    nextDayStart.setHours(24, 0, 0, 0); //자정
    const segmentEnd = nextDayStart < end ? nextDayStart : end;

    splitTime.push({
      date: current.toISOString(),
      timeSpent: segmentEnd.getTime() - current.getTime(),
    });

    current = segmentEnd;
  }

  return splitTime;
}
