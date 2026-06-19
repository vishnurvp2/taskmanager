import AddTask from "./addTask";
import TasksView from "./tasksView";

import type { TaskFromDb } from "../types/types"; // Adjust path as needed
import { useEffect, useState } from "react";
import { getAllTasks } from "../api/tasks";

const Dashboard = () => {
  const [tasks, setTasks] = useState<TaskFromDb[]>([]);
  useEffect(() => {
    const getTasks = async () => {
      const data = await getAllTasks();
      setTasks(data);
    };
    getTasks();
  }, []);

  return (
    <div className="flex flex-row justify-evenly portrait:flex-col portrait:gap-4 portrait:items-center">
      <AddTask
        className="w-3/10 portrait:w-full"
        tasks={tasks}
        setTasks={setTasks}
      />
      <TasksView
        tasks={tasks}
        className="w-6/10 portrait:w-full"
        setTasks={setTasks}
      />
    </div>
  );
};

export default Dashboard;
