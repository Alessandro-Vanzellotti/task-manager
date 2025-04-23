import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import Home from "./pages/Home/Home";
import { TaskEditing } from "./pages/TaskEditing/TaskEditing";
import { TaskType } from "./types";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />}>
          <Route index element={<Home/>} />
          <Route path='/tasks/:_id' element={<TaskEditing removeTask={function (task: TaskType): void {
            throw new Error("Function not implemented.");
          } } editTask={function (task: TaskType): void {
            throw new Error("Function not implemented.");
          } }/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}