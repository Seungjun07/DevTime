import { type ReactNode } from "react";

export default function TaskModalLayout({ children }: { children: ReactNode }) {
  // 2. 할 일 목록
  // 2-1: 할 일 추가 기능(완)
  // 2-2: 할 일 수정 버튼 클릭 시 수정 모드(수정,삭제)
  // 2-3: 이전과 변경될 시 저장하기 버튼 활성화
  // 2-4: 체크박스 동작 시 회색

  // 3. 타이머 종료
  // 3-1: 상단에 안내문구
  // 3-2: 할 일 추가,삭제,수정,토글 기능 가능
  // 3-3: 학습 회고 기능
  // 3-4: 학습 회고 15자 작성해야만 공부 완료하기 활성화

  // >> 공통 : 할 일 추가(완)

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      {/* 모달 박스 */}
      <div className="flex w-160 flex-col justify-between gap-9 rounded-lg bg-white px-9 py-12">
        {children}
      </div>
    </div>
  );
}
