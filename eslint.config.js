import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default [
    // Global ignores
    {
        ignores: ['dist', 'node_modules'],
    },

    // Base JS rules
    js.configs.recommended,

    // Base TS rules
    ...tseslint.configs.recommended,

    // Shared rules
    {
        plugins: { prettier },
        rules: {
            'prettier/prettier': 'error',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'off',
        },
    },
    // Frontend override (must come BEFORE shared rules if you want per-file rules to win)
    {
        files: ['src/client/**/*.{ts,tsx}'],
        rules: {
            'no-console': 'off',
            'no-alert': 'off',
        },
    },

    // Backend override
    {
        files: ['src/server/**/*.ts'],
        rules: {
            'no-console': 'off', // allow console logs in backend
        },
    },
];
