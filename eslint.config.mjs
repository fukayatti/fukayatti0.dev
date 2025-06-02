// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

/** @type {import('eslint').Linter.Config} */
const eslintConfig = {
  extends: ['next/core-web-vitals', 'next/typescript'],
  rules: {
    // カスタムルールをここに追加
  },
};

export default eslintConfig;
