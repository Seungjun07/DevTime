import { useEffect, useState } from "react";
import TodoItem from "../../todo-item";
import editIcon from "./../../../assets/edit.png";
import { getAccessToken } from "../../../utils/token";

export default function ManageTodos({
  onClick: onClose,
}: {
  onClick: () => void;
}) {
  const [todos, setTodos] = useState<string[]>([]);
  const [todo, setTodo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState();

  const isDisabled = todos.length < 1;

  function handleAddTodo() {
    if (todo.trim() === "") return;

    setTodos([...todos, todo]);
    setTodo("");
  }

  async function getTodos() {
    try {
      const studyLogId = JSON.parse(localStorage.getItem("studyLogId") || "");
      const accessToken = getAccessToken();

      if (!accessToken) {
        console.log("로그인 필요");
        return;
      }

      if (!accessToken) throw new Error("로그인 필요");

      const response = await fetch(
        `https://devtime.prokit.app/api/study-logs/${studyLogId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!response.ok) throw new Error("할 일 불러오기 실패");
      const data = await response.json();
      setTasks(data.data);
      console.log("현재 할일", data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      {/* 모달 박스 */}
      <div className="flex w-160 flex-col justify-between gap-9 rounded-lg bg-white px-9 py-12">
        <div className="flex w-142 flex-col gap-2">
          <div className="relative">
            <input
              id="todo"
              maxLength={30}
              value={todo}
              className="placeholder:text-disabled-300 h-14 w-full rounded-lg bg-[#f0f2f5] px-6 py-4 outline-none placeholder:text-[16px] placeholder:leading-5 placeholder:font-medium"
              onChange={(e) => setTodo(e.target.value)}
              placeholder="할 일을 추가해 주세요."
            />
            <button
              onClick={handleAddTodo}
              disabled={todo === ""}
              className={`${todo ? "text-primary-blue" : "text-disabled-400"} absolute top-[18px] right-6 bottom-[18px] cursor-pointer text-[16px] leading-5 font-bold`}
            >
              추가
            </button>
          </div>
        </div>

        <div className="scrollbar-hide flex h-115 flex-col gap-3 overflow-y-auto">
          <div className="mb-3 flex w-142 justify-between">
            <p className="text-xl leading-6 font-bold text-[#394252]">
              할 일 목록
            </p>
            <button className="flex cursor-pointer items-center gap-2">
              <img src={editIcon} alt="편집 아이콘" className="h-6 w-6" />
              <p className="text-sm leading-[18px] font-medium text-[#4b5563]">
                할 일 수정
              </p>
            </button>
          </div>
          {tasks?.tasks.map((task, i) => (
            <TodoItem key={task.id} {...task} type="MANAGE" />
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <button
            className="text-primary-blue h-12 cursor-pointer rounded-sm bg-gray-50 px-4 py-3 text-[18px] leading-[22px] font-semibold"
            onClick={onClose}
          >
            취소
          </button>
          <button
            disabled={isDisabled}
            className={`h-12 cursor-pointer rounded-sm px-4 py-3 text-[18px] leading-[22px] font-semibold ${isDisabled ? "disabled-button" : "bg-primary-blue/10 text-primary-blue"}`}
          >
            타이머 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
