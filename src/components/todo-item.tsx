import tagIcon from "./../assets/tag.png";
import editIcon from "./../assets/edit.png";
import trashIcon from "./../assets/trash.png";

export default function TodoItem({
  content,
  id,
  isCompleted,
  type,
}: {
  content: string;
  id: string;
  isCompleted?: boolean;
  type: string;
}) {
  return (
    <div className="bg-primary-blue flex h-18 w-142 items-center gap-4 rounded-md p-6 shadow-[0px_8px_8px_0px_rgba(0,0,0,0.05)]">
      <img src={tagIcon} alt="html에 tag의 이미지" />

      <p className="flex-1 text-white">{content}</p>

      {type === "MANAGE" ? (
        <label className="">
          <input type="checkbox" className="hidden" />
          <span className="h-9 w-9 border border-white"></span>
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
