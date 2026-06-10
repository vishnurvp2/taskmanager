export interface User {
  email: string;
  password: string;
  name: string;
}

export interface UserFromDb {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  created_at?: string;
}

export interface Task {
  user_id: number;
  title: string;
  description?: string | null;
  status?: "pending" | "in_progress" | "completed" | null;
  priority?: "low" | "medium" | "high" | null;
  due_date?: string | null;
}

export interface TaskFromDb extends Task {
  id: number;
  created_at: string;
  updated_at: string;
}
