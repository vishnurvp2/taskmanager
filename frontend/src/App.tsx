import LogIn from "./components/login";
import SignUp from "./components/signup";

function App() {
  return (
    <>
      <h1 className="mt-10 text-center text-4xl/9 font-bold tracking-tight text-gray-900">
        Task Manager
      </h1>
      <LogIn />
      <SignUp />
    </>
  );
}

export default App;
