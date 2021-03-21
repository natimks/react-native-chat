module.exports = {
  extends: ['react-app'],
  plugins: ['react-hooks'],
  rules: {
    'no-console': ['warn', { allow: ['info', 'error'] }],
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    'no-debugger': ['warn'],
    'no-else-return': ['warn'],
    'no-extra-bind': ['warn'],
    'jsx-a11y/href-no-hash': 0,
    'prefer-destructuring': [
      'warn',
      {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
}
