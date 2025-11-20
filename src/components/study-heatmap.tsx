const heatmapData = [
  { date: "2025-01-01", value: 1 },
  { date: "2025-01-02", value: 3 },
  { date: "2025-01-03", value: 0 },
];

const generateYearHeatmap = (year, records) => {
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  const dayMs = 24 * 60 * 60 * 1000;

  const recordMap = {};
  records.forEach((r) => (recordMap[r.date] = r.minutes));

  const days = [];
  for (let d = start; d <= end; d = new Date(d.getTime() + dayMs)) {
    const dateString = d.toISOString().slice(0, 10); // YYYY-MM-DD
    const weekday = d.getDay(); // 0~6
    const month = d.getMonth(); // 0~11

    days.push({
      date: dateString,
      month,
      weekday,
      minutes: recordMap[dateString] || 0,
    });
  }

  return days;
};

export default function StudyHeatmap() {
  function getColor(value) {
    if (value <= 2) return "bg-[#b8caff]";
    if (value <= 4) return "bg-[#87a6ff]";
    if (value <= 6) return "bg-[#4c79ff]";
    if (value <= 8) return "bg-[#1e50e5]";
    return "bg-[#023e99]";
  }

  const days = generateYearHeatmap(2025, heatmapData);
  const months = Array.from({ length: 12 }, (_, i) =>
    days.filter((d) => d.month === i),
  );

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  // 시간 포맷
  const formatMinutes = (m) => {
    const h = Math.floor(m / 60);
    const min = m % 60;
    return `${h}시간 ${min}분`;
  };
  return (
    <div className="flex flex-col rounded-[18px] bg-white p-6">
      <p>공부 시간 바다</p>
      <div className="flex gap-4">
        {/* 요일 텍스트 */}
        <div className="mt-[20px] flex flex-col gap-[6px]">
          {weekdays.map((w) => (
            <div key={w} className="text-xs text-gray-400">
              {w}
            </div>
          ))}
        </div>

        {/* 각 월 렌더 */}
        <div className="flex">
          {months.map((monthData, monthI) => (
            <div key={monthI} className="flex flex-col items-center">
              {/* 월 표시 */}
              <p className="mb-2 text-sm">{monthI + 1}월</p>

              {/* 히트맵 칸 */}
              <div
                className="grid gap-[4px]"
                style={{
                  gridTemplateRows: "repeat(7, 1fr)",
                  gridAutoFlow: "column", // 핵심 🔥 날짜가 세로로 채워지고 다음 열로 넘어감
                }}
              >
                {monthData.map((day, index) => (
                  <div
                    key={index}
                    className={`h-4 w-4 rounded-md transition ${getColor(
                      day.minutes,
                    )}`}
                    title={`${day.date} / ${formatMinutes(day.minutes)}`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p className="py-2 text-[12px] leading-4 font-semibold text-[#b8caff]">
          Shallow
        </p>
        <div className="flex">
          <div className="h-5 w-[30px] rounded-l-[5px] bg-[#b8caff]"></div>
          <div className="h-5 w-[30px] bg-[#87a6ff]"></div>
          <div className="bg-primary-blue h-5 w-[30px]"></div>
          <div className="h-5 w-[30px] bg-[#1e50e5]"></div>
          <div className="bg-secondary-indigo h-5 w-[30px] rounded-r-[5px]"></div>
        </div>
        <p className="text-secondary-indigo text-[12px] leading-4 font-semibold">
          Deep
        </p>
      </div>
    </div>
  );
}
