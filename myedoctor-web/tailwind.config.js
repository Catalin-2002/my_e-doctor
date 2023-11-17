module.exports = {
  ...require("@acme/tailwind-config"),
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}', '../../packages/ui/src/**/*.{ts,tsx}',],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-radix')(),
    // ...
  ],
};
