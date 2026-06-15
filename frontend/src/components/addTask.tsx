import {
  useState,
  type SubmitEventHandler,
  type Dispatch,
  type SetStateAction,
} from "react";
import { TaskStatusSelector, type TaskStatus } from "./taskStatusSelector";
import {
  TaskPrioritySelector,
  type TaskPriority,
} from "./taskPrioritySelector";
import { type Task } from "../types/types";

interface Task1 {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}

interface AddTaskProps {
  className?: string;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

const AddTask = ({ className = "", tasks = [], setTasks }: AddTaskProps) => {
  const [currentStatus, setCurrentStatus] = useState<TaskStatus>("pending");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const addTaskPost = async (task: Task1) => {
    const response = await fetch("http://localhost:3000/tasks/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    });
    const data = await response.json();
    setTasks([...tasks, data]);
  };
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const finalTaskData = {
      title: title,
      description: description,
      status: currentStatus,
      priority: priority,
    };
    // console.log(finalTaskData);
    addTaskPost(finalTaskData);
  };
  return (
    <form
      className={`p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-5 border border-gray-100 ${className}`}
      onSubmit={handleSubmit}
      action={""}
    >
      <h2 className="text-xl font-bold text-gray-900">Create New Task</h2>
      <div className="space-y-4 max-w-md">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="title"
            className="text-sm font-semibold text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg bg-white shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
            placeholder="Enter task title..."
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="description"
            className="text-sm font-semibold text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg bg-white shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
            placeholder="Enter task description..."
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="text-sm font-semibold text-gray-700">Status</div>
          <TaskStatusSelector
            status={currentStatus}
            setStatus={setCurrentStatus}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="text-sm font-semibold text-gray-700">Priority</div>
          <TaskPrioritySelector priority={priority} setPriority={setPriority} />
        </div>
        <button
          className="px-3 py-2 text-md border-2 border-orange-800 rounded-xl w-full bg-orange-300 hover:bg-orange-100 active:bg-orange-400"
          type="submit"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default AddTask;
