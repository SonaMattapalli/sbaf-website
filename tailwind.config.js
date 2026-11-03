/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette (SBAF brand kit): navy #0C1A41, gold #E5B84A, cream #F9F1DE
        navy: { DEFAULT: '#0C1A41', 900: '#081230', 800: '#13234F', 700: '#1B2D5E' },
        gold: { DEFAULT: '#E5B84A', 400: '#ECC86E', 600: '#C99B2E', 50: '#FCF5E3' },
        cream: '#F9F1DE',
        background: '#FBF8F1',
        foreground: '#081230',
      },
      fontFamily: {
        heading: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['Outfit', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-33.333%)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out 1.2s infinite',
      },
    },
  },
  plugins: [],
};
