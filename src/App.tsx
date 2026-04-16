import { Routes, Route } from "react-router-dom";
import { FontCalibration } from "@/routes/FontCalibration";
import { MainHeroPreview } from "@/routes/MainHeroPreview";
import { MainIntroPreview } from "@/routes/MainIntroPreview";
import { MainStatsPreview } from "@/routes/MainStatsPreview";
import { MainProgramsHeaderPreview } from "@/routes/MainProgramsHeaderPreview";
import { MainProgramsCard1Preview } from "@/routes/MainProgramsCard1Preview";
import { MainProgramsCard2Preview } from "@/routes/MainProgramsCard2Preview";
import { MainProgramsCard3Preview } from "@/routes/MainProgramsCard3Preview";
import { MainNewsPreview } from "@/routes/MainNewsPreview";
import { MainGalleryPreview } from "@/routes/MainGalleryPreview";
import { AboutHeaderPreview } from "@/routes/AboutHeaderPreview";
import { AboutMissionPreview } from "@/routes/AboutMissionPreview";
import { AboutValuesPreview } from "@/routes/AboutValuesPreview";
import { AboutVisionPreview } from "@/routes/AboutVisionPreview";
import { AboutOrganizationTabsPreview } from "@/routes/AboutOrganizationTabsPreview";
import { AboutOrganizationLogosPreview } from "@/routes/AboutOrganizationLogosPreview";
import { AboutOrganizationChartPreview } from "@/routes/AboutOrganizationChartPreview";
import { AboutOrganizationPanoramaPreview } from "@/routes/AboutOrganizationPanoramaPreview";
import { ContestHeroPreview } from "@/routes/ContestHeroPreview";
import { ContestAboutPreview } from "@/routes/ContestAboutPreview";
import { ContestBenefitsPreview } from "@/routes/ContestBenefitsPreview";
import { CertificationHeroPreview } from "@/routes/CertificationHeroPreview";
import { CertificationIntroPreview } from "@/routes/CertificationIntroPreview";
import { CertificationStatsPreview } from "@/routes/CertificationStatsPreview";
import { CertificationSubjectsPreview } from "@/routes/CertificationSubjectsPreview";
import { CertificationBenefitsPreview } from "@/routes/CertificationBenefitsPreview";
import { CertificationFlattenBottomPreview } from "@/routes/CertificationFlattenBottomPreview";
import { NewsTabsPreview } from "@/routes/NewsTabsPreview";
import { NewsTitlePreview } from "@/routes/NewsTitlePreview";
import { NewsFeaturedPreview } from "@/routes/NewsFeaturedPreview";
import { NewsListPreview } from "@/routes/NewsListPreview";
import { NewsDetailBreadcrumbPreview } from "@/routes/NewsDetailBreadcrumbPreview";
import { NewsDetailArticlePreview } from "@/routes/NewsDetailArticlePreview";
import { NewsDetailRelatedPreview } from "@/routes/NewsDetailRelatedPreview";
import { NewsDetailBackPreview } from "@/routes/NewsDetailBackPreview";
import { GalleryTitlePreview } from "@/routes/GalleryTitlePreview";
import { RootLayout } from "@/components/layout/RootLayout";
import { MainHero } from "@/components/sections/MainHero";
import { MainIntro } from "@/components/sections/MainIntro";
import { MainStats } from "@/components/sections/MainStats";
import { MainProgramsHeader } from "@/components/sections/MainProgramsHeader";
import { MainProgramsCard1 } from "@/components/sections/MainProgramsCard1";
import { MainProgramsCard2 } from "@/components/sections/MainProgramsCard2";
import { MainProgramsCard3 } from "@/components/sections/MainProgramsCard3";
import { MainNews } from "@/components/sections/MainNews";
import { MainGallery } from "@/components/sections/MainGallery";
import { AboutHeader } from "@/components/sections/AboutHeader";
import { AboutMission } from "@/components/sections/AboutMission";
import { AboutValues } from "@/components/sections/AboutValues";
import { AboutVision } from "@/components/sections/AboutVision";
import { AboutOrganizationTabs } from "@/components/sections/AboutOrganizationTabs";
import { AboutOrganizationLogos } from "@/components/sections/AboutOrganizationLogos";
import { AboutOrganizationChart } from "@/components/sections/AboutOrganizationChart";
import { AboutOrganizationPanorama } from "@/components/sections/AboutOrganizationPanorama";
import { ContestHero } from "@/components/sections/ContestHero";
import { ContestAbout } from "@/components/sections/ContestAbout";
import { ContestBenefits } from "@/components/sections/ContestBenefits";
import { CertificationHero } from "@/components/sections/CertificationHero";
import { CertificationIntro } from "@/components/sections/CertificationIntro";
import { CertificationStats } from "@/components/sections/CertificationStats";
import { CertificationSubjects } from "@/components/sections/CertificationSubjects";
import { CertificationBenefits } from "@/components/sections/CertificationBenefits";
import { CertificationFlattenBottom } from "@/components/sections/CertificationFlattenBottom";
import { NewsTabs } from "@/components/sections/NewsTabs";
import { NewsTitle } from "@/components/sections/NewsTitle";
import { NewsFeatured } from "@/components/sections/NewsFeatured";
import { NewsList } from "@/components/sections/NewsList";
import { NewsDetailBreadcrumb } from "@/components/sections/NewsDetailBreadcrumb";
import { NewsDetailArticle } from "@/components/sections/NewsDetailArticle";
import { NewsDetailRelated } from "@/components/sections/NewsDetailRelated";
import { NewsDetailBack } from "@/components/sections/NewsDetailBack";
import { GalleryTitle } from "@/components/sections/GalleryTitle";

export function App() {
  return (
    <Routes>
      {/* 격리 라우트 — 시각 회귀 캡처용 */}
      <Route path="/__calibration" element={<FontCalibration />} />
      <Route path="/__preview/main-hero" element={<MainHeroPreview />} />
      <Route path="/__preview/main-intro" element={<MainIntroPreview />} />
      <Route path="/__preview/main-stats" element={<MainStatsPreview />} />
      <Route path="/__preview/main-programs-header" element={<MainProgramsHeaderPreview />} />
      <Route path="/__preview/main-programs-card1" element={<MainProgramsCard1Preview />} />
      <Route path="/__preview/main-programs-card2" element={<MainProgramsCard2Preview />} />
      <Route path="/__preview/main-programs-card3" element={<MainProgramsCard3Preview />} />
      <Route path="/__preview/main-news" element={<MainNewsPreview />} />
      <Route path="/__preview/main-gallery" element={<MainGalleryPreview />} />
      <Route path="/__preview/about-header" element={<AboutHeaderPreview />} />
      <Route path="/__preview/about-mission" element={<AboutMissionPreview />} />
      <Route path="/__preview/about-values" element={<AboutValuesPreview />} />
      <Route path="/__preview/about-vision" element={<AboutVisionPreview />} />
      <Route path="/__preview/about-organization-tabs" element={<AboutOrganizationTabsPreview />} />
      <Route path="/__preview/about-organization-logos" element={<AboutOrganizationLogosPreview />} />
      <Route path="/__preview/about-organization-chart" element={<AboutOrganizationChartPreview />} />
      <Route path="/__preview/about-organization-panorama" element={<AboutOrganizationPanoramaPreview />} />
      <Route path="/__preview/contest-hero" element={<ContestHeroPreview />} />
      <Route path="/__preview/contest-about" element={<ContestAboutPreview />} />
      <Route path="/__preview/contest-benefits" element={<ContestBenefitsPreview />} />
      <Route path="/__preview/certification-hero" element={<CertificationHeroPreview />} />
      <Route path="/__preview/certification-intro" element={<CertificationIntroPreview />} />
      <Route path="/__preview/certification-stats" element={<CertificationStatsPreview />} />
      <Route path="/__preview/certification-subjects" element={<CertificationSubjectsPreview />} />
      <Route path="/__preview/certification-benefits" element={<CertificationBenefitsPreview />} />
      <Route path="/__preview/certification-flatten-bottom" element={<CertificationFlattenBottomPreview />} />
      <Route path="/__preview/news-tabs" element={<NewsTabsPreview />} />
      <Route path="/__preview/news-title" element={<NewsTitlePreview />} />
      <Route path="/__preview/news-featured" element={<NewsFeaturedPreview />} />
      <Route path="/__preview/news-list" element={<NewsListPreview />} />
      <Route path="/__preview/news-detail-breadcrumb" element={<NewsDetailBreadcrumbPreview />} />
      <Route path="/__preview/news-detail-article" element={<NewsDetailArticlePreview />} />
      <Route path="/__preview/news-detail-related" element={<NewsDetailRelatedPreview />} />
      <Route path="/__preview/news-detail-back" element={<NewsDetailBackPreview />} />
      <Route path="/__preview/gallery-title" element={<GalleryTitlePreview />} />

      {/* 사용자 라우트 — RootLayout으로 Header/Footer 전역 장착 */}
      <Route element={<RootLayout />}>
        <Route path="/" element={<><MainHero /><MainIntro /><MainStats /><MainProgramsHeader /><MainProgramsCard1 /><MainProgramsCard2 /><MainProgramsCard3 /><MainNews /><MainGallery /></>} />
        <Route path="/about" element={<><AboutHeader /><AboutMission /><AboutValues /><AboutVision /></>} />
        <Route path="/about/organization" element={<><AboutOrganizationTabs /><AboutOrganizationLogos /><AboutOrganizationChart /><AboutOrganizationPanorama /></>} />
        <Route path="/contact" element={<div>고객센터 — 섹션 구현 대기</div>} />
        <Route path="/contest" element={<><ContestHero /><ContestAbout /><ContestBenefits /></>} />
        <Route path="/gallery" element={<div className="pt-[180px]"><GalleryTitle /></div>} />
        <Route path="/certification" element={<><CertificationHero /><CertificationIntro /><CertificationStats /><CertificationSubjects /><CertificationBenefits /><CertificationFlattenBottom /></>} />
        <Route path="/news" element={<div className="pt-[140px]"><NewsTabs /><NewsTitle /><NewsFeatured /><NewsList /></div>} />
        <Route path="/news/:id" element={<div className="pt-[140px]"><NewsDetailBreadcrumb /><NewsDetailArticle /><NewsDetailRelated /><NewsDetailBack /></div>} />
      </Route>
    </Routes>
  );
}
