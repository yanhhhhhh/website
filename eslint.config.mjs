import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import { rules } from './temp/.eslintrc.cjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});
const rules = compat.rules(rules, {
  'react-refresh/only-export-components': [
    'off',
    { allowConstantExport: true },
  ],
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-unused-vars': 'warn',
  '@typescript-eslint/no-namespace': 'off',
});
const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  rules,
];

export default eslintConfig;
