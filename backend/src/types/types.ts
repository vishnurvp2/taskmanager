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
