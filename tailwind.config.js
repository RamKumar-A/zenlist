/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      height: {
        dynamicScreen: ['100dvh'],
      },
      fontSize: {
        md: ['1.1rem', { lineHeight: '1.25rem' }],
      },
    },
  },

  plugins: [],
};
