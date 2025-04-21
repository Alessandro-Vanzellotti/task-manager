import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Home from "./pages/Home/Home";
import { TaskDetails } from "./pages/TaskDetails/TaskDetails";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />}>
          <Route index element={<Home/>} />
          <Route path='/taskDetails/:id' element={<TaskDetails taskList={[]}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}