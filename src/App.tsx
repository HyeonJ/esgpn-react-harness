import { Routes, Route } from "react-router-dom";
import { FontCalibration } from "@/routes/FontCalibration";
import { HeaderPreview } from "@/routes/HeaderPreview";

function PhaseOnePlaceholder() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-black">
      <h1 className="text-2xl font-semibold">Phase 1 OK</h1>
    </main>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<PhaseOnePlaceholder />} />
      <Route path="/__calibration" element={<FontCalibration />} />
      <Route path="/__preview/header" element={<HeaderPreview />} />
    </Routes>
  );
}
