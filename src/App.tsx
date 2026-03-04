import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParticipantFlow from "./components/ParticipantFlow";
import CustomParticipantFlow from "./components/CustomParticipantFlow";
import AdminPage from "./components/AdminPage";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/original-shapes" element={<ParticipantFlow />} />
        <Route path="/custom-shapes" element={<CustomParticipantFlow />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;