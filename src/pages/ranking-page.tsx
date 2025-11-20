import { useEffect, useState } from "react";
import RankItem from "../components/rank-item";
import { type RankingItem } from "../types";
import { fetchWithAuth } from "../api/auth";

export default function RankingPage() {
  const [rankings, setRankins] = useState<RankingItem[]>([]);
  async function fetchRanking() {
    try {
      const data = await fetchWithAuth(
        `https://devtime.prokit.app/api/rankings`,
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
  }, []);

  return (
    <div className="m-auto flex flex-col">
      <div className="flex gap-3 rounded-xl p-2">
        <div className="bg-primary-blue/10 rounded-lg p-2 text-[18px] leading-[22px] font-bold">
          총 학습 시간
        </div>
        <div className="bg-primary-blue/10 rounded-lg p-2 text-[18px] leading-[22px]">
          일 평균 학습 시간
        </div>
      </div>

      <div className="scrollbar-hide flex h-[918px] flex-col gap-3 overflow-y-auto">
        {rankings?.map((ranking) => (
          <RankItem key={ranking.userId} {...ranking} />
        ))}
      </div>
    </div>
  );
}
