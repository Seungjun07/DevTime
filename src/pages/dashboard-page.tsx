import StudyHeatmap from "../components/study-heatmap";
import StudyRecord from "../components/study-record";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <div className="flex w-60 flex-col gap-2 rounded-[18px] bg-white p-6">
            <p className="text-disabled-400 text-[18px] leading-[22px] font-semibold">
              누적 공부 시간
            </p>
            <p className="text-secondary-indigo text-end text-4xl leading-[46px] font-bold">
              145
              <span className="text-[16px] leading-5 font-medium">
                &nbsp;시간&nbsp;
              </span>
              32
              <span className="text-[16px] leading-5 font-medium">
                &nbsp;분
              </span>
            </p>
          </div>
          <div className="w-60 rounded-[18px] bg-white p-6">2</div>
          <div className="w-60 rounded-[18px] bg-white p-6">3</div>
          <div className="w-60 rounded-[18px] bg-white p-6">4</div>
        </div>

        <div className="bg-primary-blue h-66 flex-1 rounded-[18px]">
          <p className="p-6 text-lg leading-[22px] font-semibold text-white">
            요일별 공부 시간 평균
          </p>
        </div>
      </div>

      {/* 학습 잔디 */}
      <StudyHeatmap />

      {/* 학습 기록 */}
      <StudyRecord />
    </div>
  );
}
