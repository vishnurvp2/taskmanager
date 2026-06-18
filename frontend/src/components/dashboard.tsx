import AddTask from "./addTask";
import TasksView from "./tasksView";

import type { TaskFromDb } from "../types/types"; // Adjust path as needed
import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState<TaskFromDb[]>([]);
  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch(`${API_URL}/tasks/`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTasks(data);
    };
    getTasks();
  }, []);

  return (
    <div className="flex flex-row">
      <AddTask className="w-2/10" tasks={tasks} setTasks={setTasks} />
      <TasksView tasks={tasks} className="w-6/10" setTasks={setTasks} />
      <div className="w-2/10"></div>
    </div>
  );
};

export default Dashboard;
