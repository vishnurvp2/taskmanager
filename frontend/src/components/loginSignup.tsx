import { useState, type SubmitEvent } from "react";

interface User {
  id: number;
  created_at: string;
  email: string;
  name: string | null;
  password_hash: string;
}

type loginProps = {
  onSuccess: () => void;
  onDataChange: (user: User) => void;
};

const LoginSignup = ({ onSuccess, onDataChange }: loginProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/login_signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Email or password is wrong");
        return;
      }
      console.log(data);
      onSuccess();
      onDataChange(data.user);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      setError("Unable to connect to server");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-1 rounded-xl border-orange-800 w-96 mx-auto my-3 md:w-1/3 flex flex-col p-4"
    >
      <div className="flex flex-col p-1 mb-1">
        <label htmlFor="email" className="font-light text-sm">
          Email
        </label>
        <input
          className="border-1 border-orange-700 rounded-md p-2 my-2 outline-orange-600"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="true"
        />
      </div>
      <div className="flex flex-col p-1 mb-1">
        <label className="font-light text-sm" htmlFor="password">
          Password
        </label>
        <input
          className="border-1 border-orange-700 rounded-md p-2 my-2 outline-orange-600"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-2 rounded-md my-2 text-sm">
          {error}
        </div>
      )}
      <button
        className="border-1 border-orange-700 p-2 my-5 mx-auto w-4/6 rounded-lg hover:bg-orange-300 active:bg-orange-500"
        type="submit"
      >
        Login or SignUp
      </button>
    </form>
  );
};

export default LoginSignup;
