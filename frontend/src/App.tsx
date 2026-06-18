import { useEffect, useState } from "react";
import LoginSignup from "./components/loginSignup";
import Dashboard from "./components/dashboard";
import LoadingSpinner from "./components/loadingSpinner";
import LogoutButton from "./components/logout";
import type { UserFromDb } from "./types/types";
import UserProfileButton from "./components/userProfileButton";
import { API_URL } from "./config/api";

function App() {
  const [user, setUser] = useState<UserFromDb>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [showProfile, setShowProfile] = useState(false);
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/verify_user`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(undefined);
        }
      } catch (error) {
        setUser(undefined);
        console.log(error);
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
      <h1 className="my-5 text-center text-4xl/9 font-medium tracking-tight text-orange-900">
        Task Manager
      </h1>
      <div className="flex flex-row-reverse mr-3 gap-6">
        {user && <LogoutButton setUser={setUser} />}
        {user && <UserProfileButton />}
      </div>
      <div className="">
        {user ? <Dashboard /> : <LoginSignup setUser={setUser} />}
      </div>
    </div>
  );
}

export default App;
