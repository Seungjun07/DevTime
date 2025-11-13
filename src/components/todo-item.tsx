import tagIcon from "./../assets/tag.png";
import editIcon from "./../assets/edit.png";
import trashIcon from "./../assets/trash.png";

export default function TodoItem({ todo }: { todo: string }) {
  return (
    <div className="bg-primary-blue flex items-center gap-4 rounded p-6">
      <img src={tagIcon} alt="html에 tag의 이미지" />
      <p className="flex-1 text-white">{todo}</p>
      <div className="flex gap-4">
        <button>
          <img className="cursor-pointer brightness-0 invert" src={editIcon} />
        </button>
        <button>
          <img className="cursor-pointer brightness-0 invert" src={trashIcon} />
        </button>
      </div>
    </div>
  );
}
