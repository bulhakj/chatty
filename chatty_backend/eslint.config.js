import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');

export default [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
    },
    rules: {
      semi: ['error', 'always'],
      'space-before-function-paren': ['off', { anonymous: 'always', named: 'always' }],
      camelcase: 'off',
      'no-return-assign': 'off',
      quotes: ['error', 'double'],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];
