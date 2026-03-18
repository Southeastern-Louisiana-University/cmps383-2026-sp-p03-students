import { UserLoggedInContext } from "@/context/UserLoggedInContext";
import { useState } from "react";
import { Outlet } from "react-router";

export function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <UserLoggedInContext.Provider value={isLoggedIn}>
      <div>
        <button onClick={() => setIsLoggedIn((isLoggedIn) => !isLoggedIn)}>{isLoggedIn ? "Log out" : "Log in"}</button>

        <div>Nav bar thing!</div>
      </div>

      <Outlet />
    </UserLoggedInContext.Provider>
  );
}
