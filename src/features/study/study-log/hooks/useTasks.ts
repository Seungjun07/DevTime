import { useState } from "react";
import type { Task } from "..";

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(content: string) {
    if (content.trim() === "") return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      content,
      isCompleted: false,
    };

    setTasks((prev) => [...prev, newTask]);
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function updateTask(id: string, content: string) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, content } : task)),
    );
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  }

  return { tasks, addTask, updateTask, removeTask, toggleTask, setTasks };
}
