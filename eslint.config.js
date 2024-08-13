import globals from 'globals';
import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

export default [
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        ignores: ['dist/', 'node_modules/'],
        plugins: {
            '@stylistic': stylistic,
        },
        languageOptions: { globals: globals.browser },
    },
    pluginJs.configs.recommended,
    stylistic.configs['recommended-flat'],
    stylistic.configs.customize({
        indent: 4,
        quotes: 'single',
        semi: true,
        jsx: false,
    }),
];
