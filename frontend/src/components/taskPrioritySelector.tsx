import React from "react";

// Define the available priority types
export type TaskPriority = "low" | "medium" | "heigh";

interface TaskPrioritySelectorProps {
  priority: TaskPriority;
  setPriority: (priority: TaskPriority) => void;
}

export const TaskPrioritySelector: React.FC<TaskPrioritySelectorProps> = ({
  priority,
  setPriority,
}) => {
  const priorities: TaskPriority[] = ["low", "medium", "heigh"];

  // Map priorities to matching tailwind color badges
  const getColorClass = (type: TaskPriority, isActive: boolean) => {
    if (!isActive) return "bg-gray-100 text-gray-600 hover:bg-gray-200";

    switch (type) {
      case "low":
        return "bg-emerald-500 text-white shadow-sm";
      case "medium":
        return "bg-amber-500 text-white shadow-sm";
      case "heigh":
        return "bg-rose-500 text-white shadow-sm";
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-1 bg-gray-50 rounded-lg max-w-max border border-gray-200">
      {priorities.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setPriority(item)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 ${getColorClass(item, priority === item)}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
