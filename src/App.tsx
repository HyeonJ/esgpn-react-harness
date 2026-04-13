import { Routes, Route } from "react-router-dom";
import { FontCalibration } from "@/routes/FontCalibration";
import { HeaderPreview } from "@/routes/HeaderPreview";
import { FooterPreview } from "@/routes/FooterPreview";
import { MainHeroPreview } from "@/routes/MainHeroPreview";
import { MainIntroPreview } from "@/routes/MainIntroPreview";
import { RootLayout } from "@/components/layout/RootLayout";
import { MainHero } from "@/components/sections/MainHero";
import { MainIntro } from "@/components/sections/MainIntro";

export function App() {
  return (
    <Routes>
      {/* 격리 라우트 — 시각 회귀 캡처용, Header 장착 안 함 */}
      <Route path="/__calibration" element={<FontCalibration />} />
      <Route path="/__preview/header" element={<HeaderPreview />} />
      <Route path="/__preview/footer" element={<FooterPreview />} />
      <Route path="/__preview/main-hero" element={<MainHeroPreview />} />
      <Route path="/__preview/main-intro" element={<MainIntroPreview />} />

      {/* 사용자 라우트 — RootLayout으로 Header 전역 장착 */}
      <Route element={<RootLayout />}>
        <Route
          path="/"
          element={
            <>
              <MainHero />
              <MainIntro />
            </>
          }
        />
      </Route>
    </Routes>
  );
}
