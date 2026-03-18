import { Routes, Route } from "react-router";
import Home from "@/pages/Home";
import { TestPage } from "@/pages/TestPage";
import { UserLoggedInContext } from "@/context/UserLoggedInContext";
import { useState } from "react";

export function Router() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <button onClick={() => setIsLoggedIn((isLoggedIn) => !isLoggedIn)}>{isLoggedIn ? "Log out" : "Log in"}</button>

      <UserLoggedInContext.Provider value={isLoggedIn}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="test" element={<TestPage />} />
        </Routes>
      </UserLoggedInContext.Provider>
    </>
  );
}
