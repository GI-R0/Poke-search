/* eslint-disable no-undef */
/* eslint-env node */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#141414',
        'bg-secondary': '#1f1f1f',
        'text-primary': '#ffffff',
        'text-secondary': '#b3b3b3',
        'accent': '#e50914',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        header: '72px',
      },
    },
  },
  plugins: [],
};
