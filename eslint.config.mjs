import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  {
    extends: [
      "next/core-web-vitals", 
      "next/typescript"
    ],
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      // カスタムルールをここに追加
    }
  }
];

export default eslintConfig;
