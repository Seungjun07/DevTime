import { useEffect, useRef, useState } from "react";
import RankItem from "../features/ranking/components/RankItem";
import { useInfiniteRanking } from "../features/ranking/hooks/useRankingQuery";

export default function RankingPage() {
  const [sortBy, setSortBy] = useState("total");
  const observerRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteRanking({
      sortBy,
    });

  function handleSortBy(standard: string) {
    setSortBy(standard);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    const curretTarget = observerRef.current;
    if (curretTarget) {
      observer.observe(curretTarget);
    }

    return () => {
      if (curretTarget) {
        observer.unobserve(curretTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const rankings = data?.pages.flatMap((page) => page.data.rankings) ?? [];

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
        {rankings.map((ranking) => (
          <RankItem key={ranking.userId} {...ranking} />
        ))}
        <div ref={observerRef} className="h-10" />
        {isFetchingNextPage && (
          <div className="py-4 text-center text-gray-500">로딩 중...</div>
        )}
      </div>
    </div>
  );
}
