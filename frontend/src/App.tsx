import { useEffect, useState } from "react";
import LoginSignup from "./components/loginSignup";
import Dashboard from "./components/dashboard";
import LoadingSpinner from "./components/loadingSpinner";
import LogoutButton from "./components/logout";
import UserProfileButton from "./components/userProfileButton";

interface User {
  id: number;
  created_at: string;
  email: string;
  name: string | null;
  password_hash: string;
}

function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/verify_user", {
          credentials: "include",
        });
        if (response.ok) {
          const user = await response.json();
          setAuthenticated(true);
          setUser(user);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        setAuthenticated(false);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    makeRequest();
  }, []);

  const handleLoginSignupData = (user: User) => {
    setUser(user);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h1 className="my-10 text-center text-4xl/9 font-medium tracking-tight text-orange-900">
        Task Manager
      </h1>
      <div className="flex flex-row-reverse mr-3 gap-6">
        {authenticated && <LogoutButton setAuthenticated={setAuthenticated} />}
        {authenticated && <UserProfileButton />}
      </div>
      <div>{user?.email}</div>
      {authenticated ? (
        <Dashboard />
      ) : (
        <LoginSignup
          onSuccess={() => setAuthenticated(true)}
          onDataChange={() => handleLoginSignupData}
        />
      )}
    </>
  );
}

export default App;
