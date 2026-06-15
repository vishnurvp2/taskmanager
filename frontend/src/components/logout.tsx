interface MyComponentProps {
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutButton = ({ setAuthenticated }: MyComponentProps) => {
  const handleLogout = async () => {
    try {
      // 1. Optional: Call your backend api to invalidate the token/session
      await fetch("http://localhost:3000/auth/logout", {
        method: "GET",
        credentials: "include",
      });
      setAuthenticated(false);
    } catch (error) {
      console.error("Server-side logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="p-3 border-2 border-orange-300 rounded-xl hover:bg-orange-800 hover:text-color-white active:bg-orange-300"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
