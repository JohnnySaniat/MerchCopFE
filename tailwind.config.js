/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: [
      'luxury',
      'retro',
      'autumn',
      'dim',
      'acid',
      'coffee',
    ],
    base: true,
  },
  plugins: [daisyui],
};
