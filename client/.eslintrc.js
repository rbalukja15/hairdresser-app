module.exports = {
    extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        'no-restricted-imports': [
            'error',
            {
                patterns: ['@material-ui/*/*/*', '!@material-ui/core/test-utils/*'],
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}
