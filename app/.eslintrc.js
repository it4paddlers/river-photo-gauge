module.exports = {
  plugins: ['simple-import-sort', 'unused-imports', 'testing-library'],
  extends: [
    'alloy',
    'alloy/react',
    'alloy/typescript',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'import/order': 'off',
    'import/no-cycle': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    // We often have to deal with external libraries that do not respect this rule
    'max-params': 'off',
    'max-nested-callbacks': ['error', 4],
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'no-undef': 'off',
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-imports': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};
