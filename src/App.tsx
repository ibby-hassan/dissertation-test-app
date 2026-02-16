import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParticipantFlow from "./components/ParticipantFlow";
import AdminPage from "./components/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ParticipantFlow />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;