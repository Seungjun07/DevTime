import StudyHeatmap from "../components/study-heatmap";
import StudyRecord from "../components/study-record";
import { getAccessToken } from "../utils/token";
import WeekdayStudyAverage from "../components/weekday-study-average";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../api/api";

async function getMyStudyInfo() {
  try {
    const accessToken = getAccessToken();
    if (!accessToken) throw new Error("로그인 필요");

    const response = await fetch(`${API_BASE_URL}/api/stats`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) throw new Error("정보 불러오기 실패");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export default function DashboardPage() {
  const {
    data: myStudyInfo,
    isLoading,
    error,
  } = useQuery({
    queryFn: getMyStudyInfo,
    queryKey: ["myStudyInfo"],
  });

  function formatTime(sec: number) {
    const time = Math.floor(sec / 1000);

    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

    return { hours, minutes, seconds };
  }

  const { hours: totalHours, minutes: totalMinutes } = formatTime(
    myStudyInfo?.totalStudyTime,
  );
  const { hours: averageHours, minutes: averageMinutes } = formatTime(
    myStudyInfo?.averageDailyStudyTime,
  );

  const weekdayStudyTime = Object.entries(
    myStudyInfo?.weekdayStudyTime || {},
  ).map(([day, value]) => ({ day, value }));

  if (error) return <div>오류가 발생했습니다...</div>;
  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <div className="flex w-60 flex-col gap-2 rounded-[18px] bg-white p-6">
            <p className="text-disabled-400 text-[18px] leading-[22px] font-semibold">
              누적 공부 시간
            </p>
            <p className="text-secondary-indigo text-end text-4xl leading-[46px] font-bold">
              {totalHours}
              <span className="text-[16px] leading-5 font-medium">
                &nbsp;시간&nbsp;
              </span>
              {totalMinutes}
              <span className="text-[16px] leading-5 font-medium">
                &nbsp;분
              </span>
            </p>
          </div>
          <div className="flex w-60 flex-col gap-2 rounded-[18px] bg-white p-6">
            <p className="text-disabled-400 text-[18px] leading-[22px] font-semibold">
              누적 공부 일수
            </p>
            <p className="text-secondary-indigo text-end text-4xl leading-[46px] font-bold">
              {myStudyInfo?.consecutiveDays}
              <span className="text-[16px] leading-5 font-medium">
                &nbsp;일째
              </span>
            </p>
          </div>
          <div className="flex w-60 flex-col gap-2 rounded-[18px] bg-white p-6">
            <p className="text-disabled-400 text-[18px] leading-[22px] font-semibold">
              하루 평균 공부 시간
            </p>
            <p className="text-secondary-indigo text-end text-4xl leading-[46px] font-bold">
              {averageHours}
              <span className="text-[16px] leading-5 font-medium">
                &nbsp;시간&nbsp;
              </span>
              {averageMinutes}
              <span className="text-[16px] leading-5 font-medium">
                &nbsp;분
              </span>
            </p>
          </div>
          <div className="flex w-60 flex-col gap-2 rounded-[18px] bg-white p-6">
            <p className="text-disabled-400 text-[18px] leading-[22px] font-semibold">
              목표 달성률
            </p>
            <p className="text-secondary-indigo text-end text-4xl leading-[46px] font-bold">
              {myStudyInfo?.taskCompletionRate}
              <span className="text-[16px] leading-5 font-medium">&nbsp;%</span>
            </p>
          </div>
        </div>

        <WeekdayStudyAverage weekdayStudyTime={weekdayStudyTime} />
      </div>

      {/* 학습 잔디 */}
      <StudyHeatmap />

      {/* 학습 기록 */}
      <StudyRecord />
    </div>
  );
}
