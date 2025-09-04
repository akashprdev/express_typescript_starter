// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  // Base JS config
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'warn',
    },
  },

  // TypeScript config
  ...tseslint.configs.recommended,

  // Ignore some files
  globalIgnores([
    '!node_modules/', // unignore `node_modules/` directory
    'node_modules/*', // ignore its content
    '!node_modules/mylibrary/', // unignore `node_modules/mylibrary` directory
  ]),
]);
