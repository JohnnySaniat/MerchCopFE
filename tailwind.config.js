/** @type {import('tailwindcss').Config} */
const daisyui = require('daisyui');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#252525',
          secondary: '#7F181F',
          accent: '#FACF4C',
          neutral: '#F37CBD',
          'base-100': '#171717',
          info: '#719CB0',
          success: '#655BBD',
          warning: '#6F3656',
          error: '#471E23',
        },
      },
    ],
  },
  plugins: [daisyui],
};
