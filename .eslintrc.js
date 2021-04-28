module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:import/typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-plusplus': 0,
    'import/extensions': ['error', { ts: 'never' }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
  ignorePatterns: ['build/*', 'node_modules/*'],
};
