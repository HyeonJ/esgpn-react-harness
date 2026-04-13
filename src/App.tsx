import { Routes, Route } from "react-router-dom";
import { FontCalibration } from "@/routes/FontCalibration";
import { HeaderPreview } from "@/routes/HeaderPreview";
import { FooterPreview } from "@/routes/FooterPreview";
import { RootLayout } from "@/components/layout/RootLayout";

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
      {/* 격리 라우트 — 시각 회귀 캡처용, Header 장착 안 함 */}
      <Route path="/__calibration" element={<FontCalibration />} />
      <Route path="/__preview/header" element={<HeaderPreview />} />
      <Route path="/__preview/footer" element={<FooterPreview />} />

      {/* 사용자 라우트 — RootLayout으로 Header 전역 장착 */}
      <Route element={<RootLayout />}>
        <Route path="/" element={<PhaseOnePlaceholder />} />
      </Route>
    </Routes>
  );
}
