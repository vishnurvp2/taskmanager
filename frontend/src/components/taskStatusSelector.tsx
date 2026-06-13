import React from "react";

// Define the available status types
export type TaskStatus = "pending" | "in_progress" | "completed";

interface TaskStatusSelectorProps {
  status: TaskStatus;
  setStatus: (status: TaskStatus) => void;
}

export const TaskStatusSelector: React.FC<TaskStatusSelectorProps> = ({
  status,
  setStatus,
}) => {
  const statuses: TaskStatus[] = ["pending", "in_progress", "completed"];

  // Map statuses to specific tailwind color badges
  const getColorClass = (type: TaskStatus, isActive: boolean) => {
    if (!isActive) return "bg-gray-100 text-gray-600 hover:bg-gray-200";

    switch (type) {
      case "pending":
        return "bg-blue-500 text-white shadow-sm";
      case "in_progress":
        return "bg-amber-500 text-white shadow-sm";
      case "completed":
        return "bg-purple-500 text-white shadow-sm";
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-1 bg-gray-50 rounded-lg max-w-max border border-gray-200">
      {statuses.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setStatus(item)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 ${getColorClass(item, status === item)}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
