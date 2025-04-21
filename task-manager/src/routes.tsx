import { BrowserRouter, Route, Routes } from "react-router-dom";
//import Map from "./pages/Map/Map";
import MainPage from "./pages/MainPage";
import App from "./pages/App";
//import EquipmentDetails from "./pages/EquipmentDetails/EquipmentDetails";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />}>
          <Route index element={<App/>} />
          {/* <Route path='/equipmentDetails/:id' element={<EquipmentDetails/>} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}