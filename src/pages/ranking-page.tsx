import { useEffect, useState } from "react";
import RankItem from "../components/rank-item";
import { type RankingItem } from "../types";
import { fetchWithAuth } from "../api/auth";

export default function RankingPage() {
  const [rankings, setRankins] = useState<RankingItem[]>([]);
  const [sortBy, setSortBy] = useState("total");

  function handleSortBy(standard: string) {
    setSortBy(standard);
  }
  async function fetchRanking() {
    try {
      const data = await fetchWithAuth(
        `https://devtime.prokit.app/api/rankings?sortBy=${sortBy}`,
        "GET",
      );
      console.log(data);
      setRankins(data.data.rankings);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRanking();
  }, [sortBy]);

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
