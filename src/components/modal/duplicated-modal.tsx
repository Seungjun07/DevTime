export default function DuplicatedModal({
  handleConfirm,
}: {
  handleConfirm: () => void;
}) {
  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* 모달 박스 */}
      <div className="flex w-82 flex-col items-end gap-3 rounded-xl bg-white p-6 shadow-black/5">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl leading-6 font-semibold text-[#1F2937]">
            중복 로그인이 불가능합니다.
          </h1>
          <p className="text-[16px] leading-5 font-medium text-[#4b5564]">
            다른 기기에 중복 로그인 한 상태입니다. [확인] 버튼을 누르면 다른
            기기에서 강제 로그아웃되며, 진행중이던 타이머가 있다면 기록이 자동
            삭제됩니다.
          </p>
        </div>

        <div>
          <button
            onClick={handleConfirm}
            className="bg-primary-blue h-12 rounded-[5px] px-4 py-3 text-lg leading-[22px] font-semibold text-white"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
