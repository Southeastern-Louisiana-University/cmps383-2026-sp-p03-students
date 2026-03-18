import { Routes, Route } from "react-router";
import Home from "@/pages/Home";
import { TestPage } from "@/pages/TestPage";
import { NavBar } from "@/components/NavBar";

export function Router() {
  return (
    <Routes>
      <Route element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="test" element={<TestPage />} />
      </Route>
    </Routes>
  );
}
