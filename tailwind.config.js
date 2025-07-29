/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
  extend: {
    keyframes: {
      slideOutRight: {
        '0%': { transform: 'translateX(0)', opacity: '1' },
        '100%': { transform: 'translateX(100%)', opacity: '0' },
      },
      slideInLeft: {
        '0%': { transform: 'translateX(-100%)', opacity: '0' },
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
    },
    animation: {
      slideOutRight: 'slideOutRight 0.5s ease-in-out forwards',
      slideInLeft: 'slideInLeft 0.5s ease-in-out forwards',
    },
  },
},

  plugins: [require('tailwind-scrollbar-hide')],
}