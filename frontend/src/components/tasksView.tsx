import TaskCard from "./taskCard";
import type { Task } from "../types/types";

interface TasksViewProps {
  tasks: Task[];
  className?: string;
}

export const TasksView = ({ tasks, className }: TasksViewProps) => {
  if (tasks.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-12 bg-gray-50 border border-dashed border-gray-200 rounded-xl text-center ${className}`}
      >
        <p className="text-gray-500 font-medium">No tasks found</p>
        <p className="text-xs text-gray-400 mt-1">
          Get started by creating a new task above.
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">
          Your Tasks ({tasks.length})
        </h2>
      </div>

      {/* Responsive layout grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TasksView;
