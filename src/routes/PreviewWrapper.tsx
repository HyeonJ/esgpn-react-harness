import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * PreviewWrapper — Preview 라우트에 Layout 일부를 선택적으로 마운트.
 *
 * 자율 모드 세션에서 certification-hero 측정 시 발견:
 * baseline은 full-page crop(TopNav 88px 포함)인데 preview는 standalone이라
 * TopNav 영역이 diff로 잡혀 G1 ~7%p 손해.
 *
 * 사용 예:
 *   <PreviewWrapper withHeader>
 *     <CertificationHero />
 *   </PreviewWrapper>
 *
 *   <PreviewWrapper withHeader withFooter>
 *     <MainHero />
 *   </PreviewWrapper>
 */
export interface PreviewWrapperProps {
  children: ReactNode;
  withHeader?: boolean;
  withFooter?: boolean;
}

export function PreviewWrapper({
  children,
  withHeader = false,
  withFooter = false,
}: PreviewWrapperProps) {
  return (
    <>
      {withHeader && <Header />}
      {children}
      {withFooter && <Footer />}
    </>
  );
}
