import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    files: ["src/app/cockpit/**/*.{js,jsx}", "src/components/common/EChart.jsx"],
    rules: {
      // 驾驶舱使用本地 inline SVG 资源，next/image 不适合这些动态 data URI 图标。
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
