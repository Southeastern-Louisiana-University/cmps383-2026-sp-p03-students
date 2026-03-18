import { Routes, Route } from "react-router";
import App from "./App";
import { TestPage } from "./TestPage";

export function Router() {
  return (
    <Routes>
      <Route index element={<App />} />
      <Route path="test" element={<TestPage />} />
    </Routes>
  );
}
