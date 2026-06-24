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
import { type Task, type TaskFromDb } from "../types/types";
import { saveTask, saveTaskByPrompt } from "../api/tasks";

interface AddTaskProps {
  className?: string;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<TaskFromDb[]>>;
}

const AddTask = ({ className = "", tasks = [], setTasks }: AddTaskProps) => {
  const [taskData, setTaskData] = useState({ title: "", description: "" });
  const [currentStatus, setCurrentStatus] = useState<TaskStatus>("pending");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [prompt, setPrompt] = useState("");

  const addTaskPost = async (task: Task) => {
    const data = await saveTask(task);
    setTaskData({ title: "", description: "" });
    setTasks([...tasks, data]);
  };
  const handleAddTaskByPrompt = async () => {
    const data = await saveTaskByPrompt(prompt);
    setPrompt("");
    setTasks([...tasks, ...data.data]);
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
      due_date: date,
    };
    addTaskPost(finalTaskData);
  };
  return (
    <>
      <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-slate-100">
        <p>Try new AI feature to add new tasks. powered by Gemini</p>
        {/* Label */}
        <label
          htmlFor="taskPrompt"
          className="block text-sm font-semibold text-slate-700 mb-2 transition-colors duration-200"
        >
          Describe your tasks:
        </label>

        {/* Textarea */}
        <textarea
          name="taskPrompt"
          id="taskPrompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Buy groceries tonight (high priority) and clean the kitchen tomorrow."
          className="w-full min-h-[120px] p-3 text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white resize-vertical transition-all duration-200"
        />

        {/* Action Layout Wrapper */}
        <div className="mt-3 flex justify-end">
          <button
            onClick={handleAddTaskByPrompt}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Tasks
          </button>
        </div>
      </div>
      <form
        className={`p-6 max-w-md bg-white rounded-xl shadow-md space-y-5 border border-gray-100 ${className}`}
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
              value={taskData.title}
              onChange={(e) =>
                setTaskData((prev) => ({ ...prev, title: e.target.value }))
              }
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
              value={taskData.description}
              onChange={(e) =>
                setTaskData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
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
            <TaskPrioritySelector
              priority={priority}
              setPriority={setPriority}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="due_date">Due Date</label>
            <input
              type="date"
              name="due_date"
              id="due_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button
            className="px-3 py-2 text-md border-2 border-orange-800 rounded-xl w-full bg-orange-300 hover:bg-orange-100 active:bg-orange-400"
            type="submit"
          >
            Add Task
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTask;
