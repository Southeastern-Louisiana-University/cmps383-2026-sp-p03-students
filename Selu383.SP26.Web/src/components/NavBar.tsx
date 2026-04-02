import { UserLoggedInContext } from "@/context/UserLoggedInContext";
import type { UserDto } from "@/types/UserDto";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

export function NavBar() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserDto | null>(null);
  const isLoggedIn = user !== null;

  useEffect(() => {
    fetch("/api/authentication/me")
      .then((response) => {
        if (response.ok) {
          return response.json() as Promise<UserDto>;
        }
      })
      .then((data) => {
        if (data) {
          setUser(data);
        }
      });
  }, []);
  return (
    <UserLoggedInContext.Provider value={user}>
      <div>
        <div>Nav bar thing!</div>
        {isLoggedIn && user ? (
          <p>
            Welcome, {user.userName}! [{user.roles.join(", ")}] -{" "}
            <button type="button" onClick={() => logout()}>
              Logout
            </button>
          </p>
        ) : (
          <form onSubmit={(event) => callback(event)}>
            <input type="text" placeholder="Username" value={userName} onChange={(e) => setUsername(e.target.value)} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </form>
        )}
      </div>

      <Outlet />
    </UserLoggedInContext.Provider>
  );

  function logout() {
    fetch("/api/authentication/logout", { method: "POST" }).then(() => {
      setUser(null);
    });
  }
  async function callback(event: React.SubmitEvent<HTMLFormElement>): Promise<void> {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    event.preventDefault();
    console.log("Form submitted with username:", userName, "and password:", password);
    try {
      const result = await fetch("/api/authentication/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });

      if (result.status === 400) {
        setErrorMessage("Invalid username or password. Please try again.");
        return;
      }
      if (!result.ok) {
        setErrorMessage("An unexpected error occurred. Please try again.");
        return;
      }
      const resultJson = await (result.json() as Promise<UserDto>);
      setUser(resultJson);
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
}
