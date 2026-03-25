import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItensPage from "./pages/ItensPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItensPage />} />
      </Routes>
    </BrowserRouter>
  );
}
