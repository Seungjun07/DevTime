export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <div className="flex w-60 flex-col gap-2 rounded-[18px] bg-amber-200 p-6">
            <p className="text-disabled-400 text-[18px] leading-[22px] font-semibold">
              title
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
          <div className="w-60 rounded-[18px] bg-amber-200 p-6">2</div>
          <div className="w-60 rounded-[18px] bg-amber-200 p-6">3</div>
          <div className="w-60 rounded-[18px] bg-amber-200 p-6">4</div>
        </div>

        <div className="bg-primary-blue h-66 flex-1 rounded-[18px]">right</div>
      </div>

      {/* 학습 잔디 */}
      <div className="bg-amber-400">
        <p>공부 시간 바다</p>
        <div>표</div>
        <div>색</div>
      </div>

      {/* 학습 기록 */}
      <div className="rounded-[18px] bg-green-300">
        <p>학습 기록</p>
        <div>11</div>
      </div>
    </div>
  );
}
