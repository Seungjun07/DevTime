import { useState } from "react";
import RankItem from "../components/rank-item";
import { useRankingData } from "../hooks/queries/use-ranking-data";

export default function RankingPage() {
  const [sortBy, setSortBy] = useState("total");

  const { data: rankings, isLoading } = useRankingData(sortBy);

  function handleSortBy(standard: string) {
    setSortBy(standard);
  }

  if (isLoading) return <div>로딩 중입니다..</div>;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-max gap-3 rounded-xl bg-white p-2">
        <div
          onClick={() => handleSortBy("total")}
          className={`${sortBy === "total" && "bg-primary-blue/10 font-bold"} text-secondary-indigo cursor-pointer rounded-lg p-2 text-[18px] leading-[22px]`}
        >
          총 학습 시간
        </div>
        <div
          onClick={() => handleSortBy("avg")}
          className={`${sortBy === "avg" && "bg-primary-blue/10 font-bold"} text-secondary-indigo cursor-pointer rounded-lg p-2 text-[18px] leading-[22px]`}
        >
          일 평균 학습 시간
        </div>
      </div>
      <div className="scrollbar-hide flex h-[918px] w-300 flex-col gap-3 overflow-y-auto">
        {rankings?.map((ranking) => (
          <RankItem key={ranking.userId} {...ranking} />
        ))}
      </div>
    </div>
  );
}
