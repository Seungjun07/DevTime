import { useState } from "react";
import Button from "../../../../components/common/Button";
import TextField from "../../../../components/common/TextField/TextField";

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
