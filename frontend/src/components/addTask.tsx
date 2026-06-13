import { useState } from "react";
import { TaskStatusSelector, type TaskStatus } from "./taskStatusSelector";
import {
  TaskPrioritySelector,
  type TaskPriority,
} from "./taskPrioritySelector";

const AddTask = () => {
  const [currentStatus, setCurrentStatus] = useState<TaskStatus>("pending");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  return (
    <form className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-5 border border-gray-100">
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
      </div>
    </form>
  );
};

export default AddTask;
