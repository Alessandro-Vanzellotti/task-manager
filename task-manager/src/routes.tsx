import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import Home from "./pages/Home/Home";
import TaskEditing from "./pages/TaskEditing/TaskEditing";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<Home />} />
          <Route path="/tasks/:_id" element={<TaskEditing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
