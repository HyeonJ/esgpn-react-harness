import { Routes, Route } from "react-router-dom";
import { FontCalibration } from "@/routes/FontCalibration";
import { RootLayout } from "@/components/layout/RootLayout";

export function App() {
  return (
    <Routes>
      {/* 격리 라우트 — 시각 회귀 캡처용 */}
      <Route path="/__calibration" element={<FontCalibration />} />

      {/* 사용자 라우트 — RootLayout으로 Header/Footer 전역 장착 */}
      <Route element={<RootLayout />}>
        <Route path="/" element={<div>메인페이지 — 섹션 구현 대기</div>} />
        <Route path="/about" element={<div>About 개요 — 섹션 구현 대기</div>} />
        <Route path="/about/organization" element={<div>About 조직도 — 섹션 구현 대기</div>} />
        <Route path="/contact" element={<div>고객센터 — 섹션 구현 대기</div>} />
        <Route path="/contest" element={<div>경진대회 — 섹션 구현 대기</div>} />
        <Route path="/gallery" element={<div>갤러리 — 섹션 구현 대기</div>} />
        <Route path="/certification" element={<div>자격검정 — 섹션 구현 대기</div>} />
        <Route path="/news" element={<div>뉴스 목록 — 섹션 구현 대기</div>} />
        <Route path="/news/:id" element={<div>뉴스 상세 — 섹션 구현 대기</div>} />
      </Route>
    </Routes>
  );
}
