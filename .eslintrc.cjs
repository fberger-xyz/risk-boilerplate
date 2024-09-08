// https://github.com/imbhargav5/nextbase-nextjs13-supabase-starter/blob/main/.eslintrc.cjs
// https://stackoverflow.com/questions/69513869/eslint-8-0-0-failed-to-load-plugin-typescript-eslint

module.exports = {
  root: true,
  extends: [
    'plugin:@next/next/recommended',
  ],
  overrides: [
    {
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@next/next/recommended',
        'plugin:tailwindcss/recommended',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      plugins: ['@typescript-eslint', 'tailwindcss', 'prettier'],
      rules: {
        'prettier/prettier': 1,
      },
      files: ['src/**/*.ts', 'src/**/*.tsx'],
    },
    {
      extends: ['prettier'],
      files: '*.js',
      rules: {},
    },
    {
      extends: ['prettier'],
      files: '*.cjs',
      rules: {},
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
      },
    },
  ],
};
