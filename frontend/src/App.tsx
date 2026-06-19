import { useEffect, useState } from "react";
import LoginSignup from "./components/loginSignup";
import Dashboard from "./components/dashboard";
import LoadingSpinner from "./components/loadingSpinner";
import LogoutButton from "./components/logout";
import type { UserFromDb } from "./types/types";
import UserProfileButton from "./components/userProfileButton";
import { verifyUser } from "./api/users";

function App() {
  const [user, setUser] = useState<UserFromDb>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [showProfile, setShowProfile] = useState(false);
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const user = await verifyUser();
        setUser(user);
      } catch {
        setUser(undefined);
      } finally {
        setIsLoading(false);
      }
    };
    makeRequest();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col">
      <h1 className="my-3 text-center text-4xl/9 font-medium tracking-tight text-orange-900">
        Task Manager
      </h1>
      <div className="flex flex-row-reverse mr-3 gap-6 m-2">
        {user && <LogoutButton setUser={setUser} />}
        {user && <UserProfileButton />}
      </div>
      {user ? <Dashboard /> : <LoginSignup setUser={setUser} />}
    </div>
  );
}

export default App;
