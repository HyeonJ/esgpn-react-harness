import { useState } from "react";
import { MainProgramsHeader } from "../MainProgramsHeader";
import { MainProgramsCard1 } from "../MainProgramsCard1";
import { MainProgramsCard2 } from "../MainProgramsCard2";
import { MainProgramsCard3 } from "../MainProgramsCard3";

/**
 * MainPrograms -- "ESGPN 핵심 프로그램" section wrapper with tab-slider.
 *
 * Composes MainProgramsHeader + 3 tab buttons + active Card.
 * Only one card renders at a time (clicked tab).
 *
 * v4 principles:
 * - Semantic HTML: <section>, <nav role="tablist">, <button role="tab">
 * - Keyboard accessible (tab / enter / space)
 * - Design tokens from tokens.css
 * - useState for local tab state (no global store needed)
 */

const TABS = [
  { id: "cert", label: "ESG마인드 자격검정", Card: MainProgramsCard1 },
  { id: "contest", label: "ESG실천 아이디어 경진대회", Card: MainProgramsCard2 },
  { id: "csr", label: "사회공헌 및 재능나눔", Card: MainProgramsCard3 },
] as const;

type TabId = typeof TABS[number]["id"];

export function MainPrograms() {
  const [activeTab, setActiveTab] = useState<TabId>("cert");
  const active = TABS.find((t) => t.id === activeTab) ?? TABS[0];
  const ActiveCard = active.Card;

  return (
    <section
      aria-label="ESGPN 핵심 프로그램"
      className="flex flex-col items-center w-full max-w-[1920px] mx-auto py-[120px]"
    >
      <MainProgramsHeader />

      {/* Tab bar — Figma 252:993 */}
      <nav
        role="tablist"
        aria-label="프로그램 선택"
        className="flex gap-[16px] items-center justify-center mx-auto mb-[var(--spacing-6)]"
      >
        {TABS.map((tab) => {
          const selected = tab.id === activeTab;
          const accent = selected ? "#4fb654" : "#afb8b5";
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`programs-panel-${tab.id}`}
              id={`programs-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col gap-[4px] items-center justify-center"
            >
              {/* Dot */}
              <span
                aria-hidden="true"
                className="size-[6px] rounded-full"
                style={{ backgroundColor: accent }}
              />
              {/* Text + underline */}
              <span className="flex flex-col gap-[2px] items-start w-full">
                <span className="flex items-center justify-center px-[8px]">
                  <span
                    className="font-semibold text-[16px] leading-[1.5] tracking-[-0.16px] whitespace-nowrap text-center"
                    style={{ color: accent }}
                  >
                    {tab.label}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="h-[2px] w-full"
                  style={{ backgroundColor: accent }}
                />
              </span>
            </button>
          );
        })}
      </nav>

      {/* Active card panel */}
      <div
        role="tabpanel"
        id={`programs-panel-${active.id}`}
        aria-labelledby={`programs-tab-${active.id}`}
      >
        <ActiveCard />
      </div>
    </section>
  );
}
