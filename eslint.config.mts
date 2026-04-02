// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
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
      'no-unused-vars': 'error',
    },
  },

  ...tseslint.configs.recommended,

  globalIgnores([
    '!node_modules/', // unignore `node_modules/` directory
    'node_modules/*', // ignore its content
    '!node_modules/mylibrary/', // unignore `node_modules/mylibrary` directory
    'dist/*',
    'drizzle/*',
    'api-collection/*',
  ]),
]);
