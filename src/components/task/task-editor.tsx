import { useState } from "react";
import Button from "../common/Button";
import TextField from "../common/TextField/TextField";

interface TaskEditorProps {
  onAdd: (content: string) => void;
  label?: string;
}

export default function TaskEditor({ onAdd, label }: TaskEditorProps) {
  const [task, setTask] = useState("");

  function handleAddTask() {
    if (!task.trim()) return;
    onAdd(task);
    setTask("");
  }

  return (
    <div className="w-142">
      <TextField id="task" className="w-full">
        {label && <TextField.Label>할 일 목록</TextField.Label>}
        <div className="relative">
          <TextField.Input
            id="todo"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            maxLength={30}
            className="h-14 rounded-lg bg-gray-100 placeholder:text-base placeholder:leading-5 placeholder:font-medium"
            placeholder="할 일을 추가해 주세요."
          />
          <Button
            size={"md"}
            onClick={handleAddTask}
            className={`absolute top-1 right-2 flex items-center justify-center bg-gray-100 font-bold text-black`}
          >
            추가
          </Button>
        </div>
      </TextField>
    </div>
  );
}

{
  /* <label
        htmlFor="todo"
        className="text-sm leading-[18px] font-medium text-[#4b5563]"
      >
        할 일 목록
      </label> */
}
{
  /* <div className="relative">
        <input
          id="todo"
          maxLength={30}
          value={task}
          className="placeholder:text-disabled-300 h-14 w-full rounded-lg bg-[#f0f2f5] px-6 py-4 outline-none placeholder:text-[16px] placeholder:leading-5 placeholder:font-medium"
          onChange={(e) => setTask(e.target.value)}
          placeholder="할 일을 추가해 주세요."
        />
        <button
          onClick={handleAddTask}
          disabled={task === ""}
          className={`${task ? "text-primary-blue" : "text-disabled-400"} absolute top-[18px] right-6 bottom-[18px] cursor-pointer text-[16px] leading-5 font-bold`}
        >
          추가
        </button>
      </div>
    </div> */
}
