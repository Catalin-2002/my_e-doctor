/** @type {import("prettier").Config} */
const config = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 130,
  tabWidth: 2,
  useTabs: false,
  plugins: [require('prettier-plugin-tailwindcss')],
};

module.exports = config;
