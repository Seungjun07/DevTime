import RankItem from "../components/rank-item";

export default function RankingPage() {
  return (
    <div className="m-auto flex flex-col bg-blue-300">
      <div className="flex gap-3 rounded-xl bg-white p-2">
        <div className="bg-primary-blue/10 rounded-lg p-2 text-[18px] leading-[22px] font-bold">
          총 학습 시간
        </div>
        <div className="bg-primary-blue/10 rounded-lg p-2 text-[18px] leading-[22px]">
          일 평균 학습 시간
        </div>
      </div>

      <div className="scrollbar-hide flex h-[918px] flex-col gap-3 overflow-y-auto">
        <RankItem />
        <RankItem />
        <RankItem />
        <RankItem />
        <RankItem />
        <RankItem />
        <RankItem />
        <RankItem />
        <RankItem />
        <RankItem />
        <RankItem />
        <RankItem />
        <RankItem />
        <RankItem />
        <RankItem />
        <RankItem />
      </div>
    </div>
  );
}
