export interface User {
  email: string;
  password: string;
}

export interface UserFromDb {
  id: string;
  email: string;
  password: string;
  username?: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
  description?: string;
}

export interface Task {
  title: string;
  description?: string;
  status?: "pending" | "in_progress" | "completed";
  priority?: "low" | "medium" | "high";
  due_date?: string;
}

export interface TaskFromDb {
  id: number;
  user_id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in_progress" | "completed";
  due_date?: string;
  created_at: string;
  updated_at: string;
}
