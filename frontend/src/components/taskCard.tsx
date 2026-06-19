import { type ChangeEvent } from "react";
import type { TaskFromDb } from "../types/types"; // Adjust path as needed
import type { Dispatch, SetStateAction } from "react";
import { API_URL } from "../config/api";

interface TaskCardProps {
  task: TaskFromDb;
  setTasks: Dispatch<SetStateAction<TaskFromDb[]>>;
}

type Priority = TaskFromDb["priority"];
type Status = TaskFromDb["status"];

const TaskCard = ({ task, setTasks }: TaskCardProps) => {
  const handleTaskPriorityChange = async (
    e: ChangeEvent<HTMLSelectElement>,
  ) => {
    const priority = e.target.value as Priority;
    const response = await fetch(`${API_URL}/tasks/edit`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...task, priority: priority }),
    });
    if (response.ok) {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, priority: priority } : t)),
      );
    }
  };
  const handleTaskStatusChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as Status;
    const response = await fetch(`${API_URL}/tasks/edit`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...task, status: status }),
    });
    if (response.ok) {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: status } : t)),
      );
    }
  };
  const handleTaskDueDateChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    const response = await fetch(`${API_URL}/tasks/edit`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...task, due_date: date }),
    });
    if (response.ok) {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, due_date: date } : t)),
      );
    }
  };
  const handleDeleteTask = async (id: number) => {
    const response = await fetch(`${API_URL}/tasks/delete`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskId: id }),
    });
    const data = await response.json();
    console.log(data);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Map priorities to color utility classes
  const priorityStyles = {
    low: "bg-blue-50 text-blue-700 border-blue-200",
    medium: "bg-orange-50 text-orange-700 border-orange-200",
    high: "bg-red-50 text-red-700 border-red-200",
  };

  // Map statuses to color utility classes
  const statusStyles = {
    pending: "bg-gray-100 text-gray-700",
    in_progress: "bg-amber-100 text-amber-800",
    completed: "bg-emerald-100 text-emerald-800",
  };

  return (
    <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between gap-4">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 text-base line-clamp-1">
            {task.title}
          </h3>
          <select
            className={`text-xs font-medium px-2.5 py-0.5 rounded-full border cursor-pointer ${priorityStyles[task.priority]}`}
            onChange={handleTaskPriorityChange}
            value={task.priority}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {task.description || "No description provided."}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-gray-50 pt-3">
        <select
          className={`text-xs font-semibold px-2.5 py-1 rounded-md cursor-pointer ${statusStyles[task.status]}`}
          value={task.status}
          onChange={handleTaskStatusChange}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In progress</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="date"
          className={`text-xs font-semibold px-2.5 py-1 rounded-md cursor-pointer`}
          value={task.due_date?.split("T")[0]}
          min={new Date().toISOString().split("T")[0]}
          onChange={handleTaskDueDateChange}
        ></input>
        {/* <span className="text-xs text-gray-400 font-mono">#{task.id}</span> */}
        <button
          className="text-xs text-red-400 font-mono border-red-200 border-1 p-1 rounded-xl"
          onClick={() => handleDeleteTask(task.id)}
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
