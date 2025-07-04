// .eslintrc.js
module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'react-hooks', 'prettier', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // 'prettier/prettier': 'off',
    'prettier/prettier': ['error', 
      { 
          singleQuote: true,
          bracketSpacing: true,
          bracketSameLine: false,
          printWidth: 120,
          tabWidth: 2,
          useTabs: false,
          semi: false,
          trailingComma: 'none',
          arrowParens: 'avoid',
          proseWrap: 'never' 
      }],
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'no-unused-vars': 'error',
    'unused-imports/no-unused-imports': 'error',
    'no-empty': 'off',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
}
