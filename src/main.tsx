import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "@/App";
import "@/styles/index.css";

// NOTE: Phase 1에서는 StrictMode 비활성 — 이중 렌더로 인한 에셋 로드 중복 방지 (픽셀 비교 안정성 우선).
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
