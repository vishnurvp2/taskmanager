import { useState } from "react";
import TaskCard from "./taskCard";
import TaskFilters, {
  filterTasks,
  type PriorityFilter,
  type StatusFilter,
} from "./taskFilters";
import type { TaskFromDb } from "../types/types";
import type { Dispatch, SetStateAction } from "react";

interface TasksViewProps {
  tasks: TaskFromDb[];
  className?: string;
  setTasks: Dispatch<SetStateAction<TaskFromDb[]>>;
}

export const TasksView = ({ tasks, className, setTasks }: TasksViewProps) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");

  const hasActiveFilters =
    search.trim() !== "" ||
    statusFilter !== "all" ||
    priorityFilter !== "all";

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setPriorityFilter("all");
  };

  const filteredTasks = filterTasks(
    tasks,
    search,
    statusFilter,
    priorityFilter,
  );

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
      <TaskFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        onClear={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-50 border border-dashed border-gray-200 rounded-xl text-center">
          <p className="text-gray-500 font-medium">No matching tasks</p>
          <p className="text-xs text-gray-400 mt-1">
            Try adjusting your search or filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredTasks
            .filter((task) => task.status === "pending")
            .map((task) => (
              <TaskCard key={task.id} task={task} setTasks={setTasks} />
            ))}
          {filteredTasks
            .filter((task) => task.status === "in_progress")
            .map((task) => (
              <TaskCard key={task.id} task={task} setTasks={setTasks} />
            ))}
          {filteredTasks
            .filter((task) => task.status === "completed")
            .map((task) => (
              <TaskCard key={task.id} task={task} setTasks={setTasks} />
            ))}
        </div>
      )}
    </div>
  );
};

export default TasksView;
