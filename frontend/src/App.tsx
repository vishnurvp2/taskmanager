import { useState } from "react";
import LoginSignup from "./components/loginSignup";
import Dashboard from "./components/dashboard";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <>
      <h1 className="my-10 text-center text-4xl/9 font-medium tracking-tight text-orange-900">
        Task Manager
      </h1>
      {authenticated ? (
        <Dashboard />
      ) : (
        <LoginSignup onSuccess={() => setAuthenticated(true)} />
      )}
    </>
  );
}

export default App;
