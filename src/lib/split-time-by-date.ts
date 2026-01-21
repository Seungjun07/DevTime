/**
 * 날짜별로 시간 분리
 * @param start : 시작 날짜
 * @param end : 종료 날짜
 */

export function splitTimeByDate(start: Date, end: Date) {
  // 현재 계산 중인 시간 시작점
  const result = [];
  let current = new Date(start);

  while (current < end) {
    // 현재 날짜의 마지막 23:59:59.999
    const endOfDay = new Date(current);
    endOfDay.setHours(23, 59, 59, 999);

    // 오늘 날짜 끝과 종료 시점 중 작은 값
    const chunkEnd = end < endOfDay ? end : endOfDay;
    const diffMs = chunkEnd.getTime() - current.getTime();

    // current 기준 날짜에 해당하는 시간 누적
    if (diffMs > 0) {
      result.push({
        date: current.toISOString().slice(0, 10), // YYYY-MM-DD
        timeSpent: diffMs,
      });
    }
    // addSplitTime(current, diffMs);

    // 다음 날짜로 이동
    current = new Date(chunkEnd.getTime() + 1);
  }

  return result;
}
