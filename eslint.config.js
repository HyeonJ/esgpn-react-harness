// ESLint v9 flat config.
// docs/react.md 기본 규칙 + G5(시맨틱 HTML) 게이트용 jsx-a11y.
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 2022, sourceType: "module", ecmaFeatures: { jsx: true } },
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        process: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        HTMLElement: "readonly",
        HTMLImageElement: "readonly",
        getComputedStyle: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // G5: 시맨틱 HTML / a11y 게이트 (섹션 구현 후 단계 4.5에서 측정)
      ...(jsxA11y.flatConfigs?.recommended?.rules ?? jsxA11y.configs?.recommended?.rules ?? {}),
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "error",
      // alt 과도하게 길면 텍스트 baked-in raster 안티패턴 시그널 — 경고
      // (정밀 판정은 scripts/check-text-ratio.mjs)
      "jsx-a11y/img-redundant-alt": "warn",
    },
  },
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "public/**",
    ],
  },
];
