import TaskCard from "./taskCard";
import type { TaskFromDb } from "../types/types";
import type { Dispatch, SetStateAction } from "react";

interface TasksViewProps {
  tasks: TaskFromDb[];
  className?: string;
  setTasks: Dispatch<SetStateAction<TaskFromDb[]>>;
}

export const TasksView = ({ tasks, className, setTasks }: TasksViewProps) => {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tasks
          .filter((task) => task.status === "pending")
          .map((task) => (
            <TaskCard key={task.id} task={task} setTasks={setTasks} />
          ))}
        {tasks
          .filter((task) => task.status === "in_progress")
          .map((task) => (
            <TaskCard key={task.id} task={task} setTasks={setTasks} />
          ))}
        {tasks
          .filter((task) => task.status === "completed")
          .map((task) => (
            <TaskCard key={task.id} task={task} setTasks={setTasks} />
          ))}
      </div>
    </div>
  );
};

export default TasksView;
