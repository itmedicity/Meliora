// module.exports = {
//   // parser: '@typescript-eslint/parser', // Specifies the ESLint parser
//   parserOptions: {
//     ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
//     sourceType: 'module', // Allows for the use of imports
//     ecmaFeatures: {
//       jsx: true, // Allows for the parsing of JSX
//     },
//   },
//   settings: {
//     react: {
//       version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
//     },
//   },
//   extends: [
//      'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:react-hooks/recommended',
//     'plugin:prettier/recommended',
//     // 'react-app',
//     // 'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
//     // 'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
//   ],
//   // plugins: ['react', 'react-hooks'],
  
//   rules: {
//     // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
//     // e.g. "@typescript-eslint/explicit-function-return-type": "off",
//     'prettier/prettier': ['off', { singleQuote: true }],
//     "react/prop-types": "off",
//     "react/display-name": "off"
//   },
// }

// module.exports = {
//   root: true,
//   parser: '@babel/eslint-parser',
//   parserOptions: {
//     ecmaVersion: 2021,
//     sourceType: 'module',
//     requireConfigFile: false,
//     ecmaFeatures: {
//       jsx: true,
//     },
//   },
//   env: {
//     browser: true,
//     node: true,
//     es6: true,
//   },
//   plugins: ['react', 'react-hooks', 'prettier'],
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:react-hooks/recommended',
//     'plugin:prettier/recommended',
//   ],
//   rules: {
//     'prettier/prettier': 'error',
//     'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
//     'react/prop-types': 'off',
//   },
//   settings: {
//     react: {
//       version: 'detect',
//     },
//   },
// }

// module.exports = {
//   root: true,
//   parser: '@babel/eslint-parser',
//   parserOptions: {
//     ecmaVersion: 2021,
//     sourceType: 'module',
//     requireConfigFile: false,
//     ecmaFeatures: {
//       jsx: true,
//     },
//   },
//   env: {
//     browser: true,
//     node: true,
//     es6: true,
//   },
//   settings: {
//     react: {
//       version: 'detect',
//     },
//   },
//   plugins: ['react', 'react-hooks', 'prettier', 'unused-imports'],
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:react-hooks/recommended',
//     'plugin:prettier/recommended',
//   ],
//   rules: {
//     'prettier/prettier': ['error', { singleQuote: true }],
//     'react/prop-types': 'off',
//     'react/display-name': 'off',

//     // Unused import and variable cleanup
//     'no-unused-vars': 'off',
//     'unused-imports/no-unused-imports': 'error',
//     'unused-imports/no-unused-vars': [
//       'warn',
//       {
//         vars: 'all',
//         varsIgnorePattern: '^_',
//         args: 'after-used',
//         argsIgnorePattern: '^_',
//       },
//     ],
//   },
// }

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
          jsxBracketSameLine: false,
          printWidth: 120,
          tabWidth: 2,
          useTabs: false,
          semi: true,
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
