export default function RankItem() {
  return (
    <div className="flex gap-9 rounded-xl bg-gray-300 px-6 py-3">
      <div className="flex h-[126px] w-20 flex-col gap-4">
        <div className="bg-primary-blue flex h-7 w-11 items-center justify-center rounded-xs px-2 text-xl leading-6 font-bold text-white">
          1위
        </div>
        <div className="h-20 w-20 items-center rounded-full bg-amber-200"></div>
      </div>
      <div className="flex h-auto w-[998px] flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <div className="text-primary-blue text-xl leading-6 font-bold">
            닉네임
          </div>
          <div className="text-primary-blue text-[16px] leading-5 font-medium">
            목표
          </div>
        </div>
        <div>시간</div>
        <div>태그</div>
      </div>
    </div>
  );
}
