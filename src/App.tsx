import { Routes, Route } from "react-router-dom";
import { FontCalibration } from "@/routes/FontCalibration";
import { HeaderPreview } from "@/routes/HeaderPreview";
import { FooterPreview } from "@/routes/FooterPreview";
import { MainHeroPreview } from "@/routes/MainHeroPreview";
import { MainIntroPreview } from "@/routes/MainIntroPreview";
import { MainStatsPreview } from "@/routes/MainStatsPreview";
import { MainProgramsHeaderPreview } from "@/routes/MainProgramsHeaderPreview";
import { MainProgramsCard1Preview } from "@/routes/MainProgramsCard1Preview";
import { MainProgramsCard2Preview } from "@/routes/MainProgramsCard2Preview";
import { MainProgramsCard3Preview } from "@/routes/MainProgramsCard3Preview";
import { MainNewsPreview } from "@/routes/MainNewsPreview";
import { MainGalleryPreview } from "@/routes/MainGalleryPreview";
import { RootLayout } from "@/components/layout/RootLayout";
import { MainHero } from "@/components/sections/MainHero";
import { MainIntro } from "@/components/sections/MainIntro";
import { MainStats } from "@/components/sections/MainStats";
import { MainPrograms } from "@/components/sections/MainPrograms";
import { MainNews } from "@/components/sections/MainNews";
import { MainGallery } from "@/components/sections/MainGallery";

export function App() {
  return (
    <Routes>
      {/* 격리 라우트 — 시각 회귀 캡처용, Header 장착 안 함 */}
      <Route path="/__calibration" element={<FontCalibration />} />
      <Route path="/__preview/header" element={<HeaderPreview />} />
      <Route path="/__preview/footer" element={<FooterPreview />} />
      <Route path="/__preview/main-hero" element={<MainHeroPreview />} />
      <Route path="/__preview/main-intro" element={<MainIntroPreview />} />
      <Route path="/__preview/main-stats" element={<MainStatsPreview />} />
      <Route path="/__preview/main-programs-header" element={<MainProgramsHeaderPreview />} />
      <Route path="/__preview/main-programs-card1" element={<MainProgramsCard1Preview />} />
      <Route path="/__preview/main-programs-card2" element={<MainProgramsCard2Preview />} />
      <Route path="/__preview/main-programs-card3" element={<MainProgramsCard3Preview />} />
      <Route path="/__preview/main-news" element={<MainNewsPreview />} />
      <Route path="/__preview/main-gallery" element={<MainGalleryPreview />} />

      {/* 사용자 라우트 — RootLayout으로 Header 전역 장착 */}
      <Route element={<RootLayout />}>
        <Route
          path="/"
          element={
            <>
              <MainHero />
              <MainIntro />
              <MainStats />
              <MainPrograms />
              <MainNews />
              <MainGallery />
            </>
          }
        />
      </Route>
    </Routes>
  );
}
