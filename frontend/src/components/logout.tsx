import { API_URL } from "../config/api";
import type { UserFromDb } from "../types/types";

interface MyComponentProps {
  setUser: React.Dispatch<React.SetStateAction<UserFromDb | undefined>>;
}

const LogoutButton = ({ setUser }: MyComponentProps) => {
  const handleLogout = async () => {
    try {
      // 1. Optional: Call your backend api to invalidate the token/session
      await fetch(`${API_URL}/auth/logout`, {
        method: "GET",
        credentials: "include",
      });
      setUser(undefined);
    } catch (error) {
      console.error("Server-side logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 border-2 border-orange-300 rounded-xl hover:bg-orange-800 hover:text-color-white active:bg-orange-300"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
