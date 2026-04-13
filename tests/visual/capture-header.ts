/**
 * capture-header.ts — Header preview 라우트를 1920×120 clip으로 캡처.
 * baseline PNG 확보 후 compare-section.sh header 로 비교.
 */
import { captureUrl } from "./capture.ts";

await captureUrl({
  url: "http://127.0.0.1:5173/__preview/header",
  outPath: "tests/visual/captures/header.png",
  viewportWidth: 1920,
  viewportHeight: 200,
  fullPage: false,
  clip: { x: 0, y: 0, width: 1920, height: 120 },
});
console.log("captured: tests/visual/captures/header.png (1920x120)");
