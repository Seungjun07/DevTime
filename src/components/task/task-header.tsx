import Button from "../common/Button";
import editIcon from "./../../assets/edit.png";

interface TaskHeaderProps {
  onEdit: () => void;
}

export default function TaskHeader({ onEdit }: TaskHeaderProps) {
  function handleEdit() {
    onEdit();
  }
  return (
    <div className="flex justify-between">
      <h2 className="text-xl leading-6 font-bold text-[#394252]">할 일 목록</h2>

      <div className="flex">
        <button
          onClick={handleEdit}
          className="flex cursor-pointer items-center gap-2"
        >
          <img src={editIcon} alt="편집 아이콘" className="h-6 w-6" />
          <span className="text-sm leading-[18px] font-medium text-gray-600">
            할 일 수정
          </span>
        </button>
      </div>
    </div>
  );
}

{
  /* {type !== "CREATE" && (
          <div className="mb-3 flex w-142 justify-between">
            <p className="text-xl leading-6 font-bold text-[#394252]">
              할 일 목록
            </p>
            {!isEditMode && type === "UPDATE" && (
              <button
                onClick={() => setIsEditMode?.(true)}
                className="flex cursor-pointer items-center gap-2"
              >
                <img src={editIcon} alt="편집 아이콘" className="h-6 w-6" />
                <p className="text-sm leading-[18px] font-medium text-[#4b5563]">
                  할 일 수정
                </p>
              </button>
            )}
          </div>
        )} */
}
