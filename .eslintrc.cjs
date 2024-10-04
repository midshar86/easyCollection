/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020, // 确保使用的是 ES2020 的语法规范
  },
  rules: {
    // 在这里添加需要关闭的规则
    'node/no-unsupported-features/es-syntax': 'off',
  },
}

