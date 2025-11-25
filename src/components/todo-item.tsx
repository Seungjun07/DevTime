import tagIcon from "./../assets/tag.png";
import editIcon from "./../assets/edit.png";
import trashIcon from "./../assets/trash.png";
import checkIcon from "./../assets/check.png";

export default function TodoItem({
  content,
  id,
  isCompleted = false,
  onToggle,
  type,
}: {
  content: string;
  id: string;
  isCompleted?: boolean;
  onToggle: (id: string) => void;
  type: string;
}) {
  return (
    <div
      className={`${isCompleted ? "bg-disabled-400" : "bg-primary-blue"} flex h-18 w-142 cursor-pointer items-center gap-4 rounded-md p-6 shadow-[0px_8px_8px_0px_rgba(0,0,0,0.05)]`}
      onClick={() => onToggle(id)}
    >
      <img src={tagIcon} alt="html에 tag의 이미지" />

      <p className="flex-1 text-white">{content}</p>

      {type === "MANAGE" ? (
        <label className="flex cursor-pointer items-center">
          <input
            type="checkbox"
            className="peer hidden"
            checked={isCompleted}
            onChange={() => onToggle(id)}
          />
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-md border-[1.5px] border-white ${isCompleted ? "peer-checked:bg-white/50" : "peer-checked:bg-white"}`}
          >
            {isCompleted ? (
              <img
                src={checkIcon}
                alt="체크 아이콘"
                className="h-full w-full object-cover"
              />
            ) : null}
          </span>
        </label>
      ) : (
        <>
          <button>
            <img
              className="cursor-pointer brightness-0 invert"
              src={editIcon}
            />
          </button>

          <button>
            <img
              className="cursor-pointer brightness-0 invert"
              src={trashIcon}
            />
          </button>
        </>
      )}
    </div>
  );
}
