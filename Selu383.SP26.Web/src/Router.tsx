import { Routes, Route } from "react-router";
import App from "./App";

export function Router() {
  return (
    <Routes>
      <Route index element={<App />} />
      <Route path="test" element={<h1>Test Route</h1>} />
    </Routes>
  );
}
