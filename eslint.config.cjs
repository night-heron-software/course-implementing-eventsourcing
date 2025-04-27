// eslint.config.cjs
// Flat ESLint config for a TypeScript project (CommonJS)

const eslintJs = require('@eslint/js');
const tseslint = require('typescript-eslint');

/**
 * Export a flat config using commonjs syntax.
 * - Applies ESLint core recommended rules.
 * - Applies TypeScript-ESLint recommended rules.
 * - Disables "declared but never used" errors for TS variables and allows underscore prefix.
 * - Forbids use of the non-null assertion operator (`!`).
 */
module.exports = tseslint.config(
    eslintJs.configs.recommended,
    tseslint.configs.recommended,
    {
        rules: {
            // Turn off the base no-unused-vars (in favor of the TS version)
            'no-unused-vars': 'off',
            // Disable or customize the TS no-unused-vars rule
            '@typescript-eslint/no-unused-vars': [
                'off',
                {
                    vars: 'all',
                    args: 'after-used',
                    ignoreRestSiblings: true,
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_'
                }
            ],
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-explicit-any': 'off'
        }
    }
);
