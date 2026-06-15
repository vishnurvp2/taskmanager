import AddTask from "./addTask";
import TasksView from "./tasksView";

import type { Task } from "../types/types"; // Adjust path as needed
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch("http://localhost:3000/tasks/", {
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
      <TasksView tasks={tasks} className="w-6/10" />
      <div className="w-2/10"></div>
    </div>
  );
};

export default Dashboard;
