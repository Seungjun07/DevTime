import { formatTime } from "../utils/time";

type StudyData = {
  day: string;
  value: number;
};

type WeekdayStudyAverageProps = {
  weekdayStudyTime: StudyData[];
};

export default function WeekdayStudyAverage({
  weekdayStudyTime,
}: WeekdayStudyAverageProps) {
  const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

  const dayToLabel: { [day: string]: string } = {
    Sunday: "S",
    Monday: "M",
    Tuesday: "T",
    Wednesday: "W",
    Thursday: "T",
    Friday: "F",
    Saturday: "S",
  };

  const studyData = DAY_LABELS.map((label, index) => {
    let dayKey: string;
    if (label === "S" && index === 0) dayKey = "Sunday";
    else if (label === "T" && index === 2) dayKey = "Tuesday";
    else if (label === "T" && index === 4) dayKey = "Thursday";
    else if (label === "S" && index === 6) dayKey = "Saturday";
    else {
      dayKey = Object.keys(dayToLabel).find(
        (key) =>
          dayToLabel[key] === label &&
          key !== "Sunday" &&
          key !== "Tuesday" &&
          key !== "Thursday" &&
          key !== "Saturday",
      )!;
    }

    const dataObj = weekdayStudyTime.find((d) => d.day === dayKey);

    return {
      label,
      value: dataObj?.value || 0,
      timeStr: formatTime(dataObj?.value || 0),
    };
  });

  return (
    <div className="bg-primary-blue flex flex-1 flex-col rounded-[18px]">
      <p className="p-6 text-lg leading-[22px] font-semibold text-white">
        요일별 공부 시간 평균
      </p>

      <div className="pb-6">
        <div className="flex justify-end gap-2 pr-12">
          {/* y축 */}
          <div className="flex h-35 w-20 flex-col gap-10">
            <div className="flex flex-col gap-1">
              <div className="h-px bg-white/50"></div>
              <span className="text-xs leading-4 font-bold text-white/50">
                24시간
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-px bg-white/50"></div>
              <span className="text-xs leading-4 font-bold text-white/50">
                16시간
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-px bg-white/50"></div>
              <span className="text-xs leading-4 font-bold text-white/50">
                8시간
              </span>
            </div>
          </div>

          {studyData.map((data, index) => {
            const fillHeight = (data.value / (3600 * 1000 * 24)) * 100;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-2"
              >
                <div className="flex h-40 w-9 flex-col justify-end rounded-sm bg-white/50">
                  <div
                    className={`w-full bg-white ${fillHeight === 100 ? "rounded-t-sm" : "rounded-sm"}`}
                    style={{
                      height: `${fillHeight > 0 && fillHeight < 1 ? 2 : fillHeight}%`,
                    }}
                  ></div>
                </div>
                <div className="text-secondary-indigo flex h-5 w-5 items-center justify-center rounded-full bg-white/50 text-xs leading-4 font-bold">
                  {DAY_LABELS[index]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
