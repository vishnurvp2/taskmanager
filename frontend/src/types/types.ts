export type TaskStatus = "pending" | "in_progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}

export interface UserProfile {
  id: number;
  email: string;
  name: string | null;
  gender?: string | null;
  description?: string | null;
}
