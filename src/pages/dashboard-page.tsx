import { useEffect, useState } from "react";
import StudyHeatmap from "../components/study-heatmap";
import StudyRecord from "../components/study-record";
import { getAccessToken } from "../utils/token";

export default function DashboardPage() {
  const [myStudyInfo, setMyStudyInfo] = useState();
  async function getMyStudyInfo() {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) throw new Error("로그인 필요");

      const response = await fetch("https://devtime.prokit.app/api/stats", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) throw new Error("정보 불러오기 실패");
      const data = await response.json();
      console.log(data);
      setMyStudyInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMyStudyInfo();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <div className="flex w-60 flex-col gap-2 rounded-[18px] bg-white p-6">
            <p className="text-disabled-400 text-[18px] leading-[22px] font-semibold">
              누적 공부 시간
            </p>
            <p className="text-secondary-indigo text-end text-4xl leading-[46px] font-bold">
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
