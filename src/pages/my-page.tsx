import editIcon from "./../assets/edit.png";

export default function MyPage() {
  return (
    <div className="m-auto flex gap-14 rounded-xl bg-blue-200 p-9">
      <div className="h-45 w-45 bg-[#f0f2f5]">이미지박스</div>

      <div className="flex flex-1 flex-col gap-12">
        <div className="flex flex-col gap-1">
          <p className="text-secondary-indigo text-[18px] leading-[22px] font-medium">
            tony_engineer
          </p>
          <p className="text-disabled-300 text-2xl leading-[30px] font-bold">
            아직 설정한 목표가 없어요
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-disabled-400 text-[14px] leading-[18px] font-semibold">
              이메일 주소
            </p>
            <p className="text-[18px] leading-[22px] font-semibold text-gray-600">
              tony@naver.com
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-disabled-400 text-[14px] leading-[18px] font-semibold">
              개발 경력
            </p>
            <p className="text-disabled-300 text-[18px] leading-[22px] font-semibold">
              개발 경력을 업데이트 해주세요.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-disabled-400 text-[14px] leading-[18px] font-semibold">
              공부 목적
            </p>
            <p className="text-disabled-300 text-[18px] leading-[22px] font-semibold">
              공부 목적을 업데이트 해주세요.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-disabled-400 text-[14px] leading-[18px] font-semibold">
              개발 스택
            </p>
            <p className="text-disabled-300 text-[18px] leading-[22px] font-semibold">
              현재 공부 중인 또는 가지고 있는 개발 스택을 업데이트 해주세요.
            </p>
          </div>
        </div>
      </div>

      <div className="flex cursor-pointer gap-2">
        <img className="size-6" src={editIcon} alt="편집 아이콘 이미지" />
        <p>회원정보 수정</p>
      </div>
    </div>
  );
}
