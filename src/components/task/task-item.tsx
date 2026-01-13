import tagIcon from "./../../assets/tag.png";
import editIcon from "./../../assets/edit.png";
import trashIcon from "./../../assets/trash.png";
import checkIcon from "./../../assets/check.png";
import { useEffect, useRef, useState } from "react";

interface TaskItemProps {
  id: string;
  content: string;
  isCompleted?: boolean;

  isEditMode: boolean;

  onChange: (id: string, content: string) => void;
  onRemove: (id: string) => void;
  onToggle?: (id: string) => void;
}

export default function TaskItem({
  id,
  content,
  isCompleted = false,
  isEditMode,
  onChange,
  onRemove,
  onToggle,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div
      className={`${isCompleted ? "bg-disabled-400" : "bg-primary-blue"} flex h-18 w-142 cursor-pointer items-center gap-4 rounded-md p-6 shadow-[0px_8px_8px_0px_rgba(0,0,0,0.05)]`}
      // onClick={() => onToggle(id)}
    >
      <img src={tagIcon} alt="html에 tag의 이미지" />

      {isEditing ? (
        <input
          ref={inputRef}
          className="flex-1 text-white outline-none"
          value={content}
          onChange={(e) => onChange(id, e.target.value)}
        />
      ) : (
        <p className="flex-1 text-white">{content}</p>
      )}

      {/* 체크박스 */}
      {onToggle && !isEditMode && (
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
            {isCompleted && (
              <img
                src={checkIcon}
                alt="체크 아이콘"
                className="h-full w-full object-cover"
              />
            )}
          </span>
        </label>
      )}

      {!onToggle && (
        <>
          {isEditing ? (
            <button onClick={() => setIsEditing(false)}>
              <img className="h-6 w-6 cursor-pointer" src={checkIcon} />
            </button>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)}>
                <img
                  className="cursor-pointer brightness-0 invert"
                  src={editIcon}
                />
              </button>

              <button onClick={() => onRemove(id)}>
                <img
                  className="cursor-pointer brightness-0 invert"
                  src={trashIcon}
                />
              </button>
            </>
          )}
        </>
      )}
      {/* {onToggle && !isEditMode ? (
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
            {isCompleted && (
              <img
                src={checkIcon}
                alt="체크 아이콘"
                className="h-full w-full object-cover"
              />
            )}
          </span>
        </label>
      ) : (
        <>
          {isEditing ? (
            <button onClick={() => setIsEditing(false)}>
              <img className="h-6 w-6 cursor-pointer" src={checkIcon} />
            </button>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)}>
                <img
                  className="cursor-pointer brightness-0 invert"
                  src={editIcon}
                />
              </button>

              <button onClick={() => onRemove(id)}>
                <img
                  className="cursor-pointer brightness-0 invert"
                  src={trashIcon}
                />
              </button>
            </>
          )}
        </>
      )} */}
    </div>
  );
}
