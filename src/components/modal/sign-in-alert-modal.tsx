import { useNavigate } from "react-router-dom";

export default function SignInAlertModal({ close }: { close: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* 모달 박스 */}
      <div className="flex w-82 flex-col items-end gap-6 rounded-xl bg-white p-6 shadow-black/5">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl leading-6 font-semibold text-[#1F2937]">
            로그인이 필요합니다.
          </h1>
          <p className="text-[16px] leading-5 font-medium text-[#4b5563]">
            DevTime을 사용하려면 로그인이 필요합니다. 로그인 페이지로
            이동할까요?
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={close}
            className="text-primary-blue h-12 cursor-pointer rounded-sm bg-[#f9fafb] px-4 py-3 text-lg leading-[22px] font-semibold"
          >
            취소
          </button>
          <button
            onClick={() => navigate("/sign-in")}
            className="bg-primary-blue h-12 cursor-pointer rounded-sm px-4 py-3 text-lg leading-[22px] font-semibold text-white"
          >
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
}
