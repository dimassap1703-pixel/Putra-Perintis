/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#17191B',
        'deep-black': '#101112',
        'pp-yellow': '#F5B82E',
        'off-white': '#F5F4EF',
        'steel-gray': '#777B80',
        'success-green': '#16A34A',
        'danger-red': '#DC2626',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        industrial: ['"Barlow Condensed"', 'sans-serif'],
        body: ['Inter', '"Manrope"', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
      },
    },
  },
  plugins: [],
};
