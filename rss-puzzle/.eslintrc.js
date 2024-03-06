module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    plugins: ['prettier', 'import', '@typescript-eslint'],
    extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'prettier'],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        '@typescript-eslint/no-explicit-any': 2,
    },
};
