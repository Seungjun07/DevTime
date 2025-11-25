export default function SignInAlertModal({
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
            DevTime을 사용하려면 로그인이 필요합니다. 로그인 페이지로
            이동할까요?
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleConfirm}
            className="bg-primary-blue h-12 rounded-[5px] px-4 py-3 text-lg leading-[22px] font-semibold text-white"
          >
            취소
          </button>
          <button className="bg-primary-blue h-12 rounded-[5px] px-4 py-3 text-lg leading-[22px] font-semibold text-white">
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
}
