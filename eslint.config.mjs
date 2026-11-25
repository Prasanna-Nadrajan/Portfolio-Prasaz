import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Allow SSR-safe client hydration effects (localStorage, DOM dataset, route reset).
      "react-hooks/set-state-in-effect": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default eslintConfig;
