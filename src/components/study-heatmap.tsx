import { useMemo, useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import { useHeatmapData } from "../hooks/queries/use-heatmap-data";

export default function StudyHeatmap() {
  const {
    data: heatmapData,
    isError: isHeatmapError,
    isLoading: isHeatmapLoading,
    error,
  } = useHeatmapData();

  const { startDate, endDate } = useMemo(() => {
    const end = new Date();
    const start = new Date(end);
    start.setFullYear(end.getFullYear() - 1);
    return { startDate: start, endDate: end };
  }, []);

  // 히트맵 높이 계산 (7일 * (셀 크기 + 간격) + 월 라벨 공간)
  const heatmapHeight = 7 * (16 + 4) + 30;

  if (isHeatmapLoading) return <div>로딩 중...</div>;
  if (isHeatmapError) return <div>{error.message}</div>;
  return (
    <div className="flex flex-col gap-6 rounded-[18px] bg-white p-6">
      <h2 className="text-disabled-400 text-lg leading-[22px] font-semibold">
        공부 시간 바다
      </h2>

      <div className="scrollbar-hide overflow-x-auto">
        <div className="w-full">
          <HeatMap
            value={heatmapData}
            startDate={startDate}
            endDate={endDate}
            width={1110}
            height={heatmapHeight}
            rectSize={16}
            space={4}
            monthLabels={[
              "1월",
              "2월",
              "3월",
              "4월",
              "5월",
              "6월",
              "7월",
              "8월",
              "9월",
              "10월",
              "11월",
              "12월",
            ]}
            weekLabels={["일", "월", "화", "수", "목", "금", "토"]}
            panelColors={{
              // 0: "#eee",
              1: "#b8caff",
              2: "#87a6ff",
              3: "#4c79ff",
              4: "#1e50e5",
              5: "#023e99",
            }}
            legendRender={() => <></>}
            rectRender={(props, data) => {
              return <rect {...props} rx="3" />;
            }}
          />
        </div>
      </div>

      {/* 범례 */}
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
