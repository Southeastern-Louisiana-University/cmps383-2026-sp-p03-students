import { Routes, Route } from "react-router";
import App from "@/pages/App";
import { TestPage } from "@/pages/TestPage";

export function Router() {
  return (
    <Routes>
      <Route index element={<App />} />
      <Route path="test" element={<TestPage />} />
    </Routes>
  );
}
