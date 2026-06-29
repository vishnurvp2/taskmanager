import type { TaskFromDb } from "../types/types";
import type { TaskPriority } from "./taskPrioritySelector";
import type { TaskStatus } from "./taskStatusSelector";

export type StatusFilter = TaskStatus | "all";
export type PriorityFilter = TaskPriority | "all";

interface TaskFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (value: StatusFilter) => void;
  priorityFilter: PriorityFilter;
  onPriorityFilterChange: (value: PriorityFilter) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

const priorityOptions: { value: PriorityFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export function filterTasks(
  tasks: TaskFromDb[],
  search: string,
  statusFilter: StatusFilter,
  priorityFilter: PriorityFilter,
): TaskFromDb[] {
  const query = search.trim().toLowerCase();

  return tasks.filter((task) => {
    if (statusFilter !== "all" && task.status !== statusFilter) {
      return false;
    }
    if (priorityFilter !== "all" && task.priority !== priorityFilter) {
      return false;
    }
    if (query) {
      const inTitle = task.title.toLowerCase().includes(query);
      const inDescription =
        task.description?.toLowerCase().includes(query) ?? false;
      if (!inTitle && !inDescription) {
        return false;
      }
    }
    return true;
  });
}

const TaskFilters = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  onClear,
  hasActiveFilters,
}: TaskFiltersProps) => {
  return (
    <div className="space-y-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-slate-800">Your tasks</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      <div>
        <label
          htmlFor="task-search"
          className="block text-sm font-semibold text-slate-700 mb-2"
        >
          Search
        </label>
        <input
          id="task-search"
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title or description..."
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <p className="block text-sm font-semibold text-slate-700 mb-2">
          Status
        </p>
        <div className="flex flex-wrap gap-2 p-1 bg-gray-50 rounded-lg border border-gray-200">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onStatusFilterChange(option.value)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 ${
                statusFilter === option.value
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="block text-sm font-semibold text-slate-700 mb-2">
          Priority
        </p>
        <div className="flex flex-wrap gap-2 p-1 bg-gray-50 rounded-lg border border-gray-200">
          {priorityOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onPriorityFilterChange(option.value)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 ${
                priorityFilter === option.value
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
