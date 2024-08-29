/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        flash: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        flash: 'flash 1s infinite',
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
        handjet: ['Handjet', 'sans-serif'],
        friends: ['GabrielWeissFriends', 'sans-serif'],
        sf: ['SanFransicoFont', 'sans-serif'],
      },
      // Adding custom utilities for font smoothing
      extend: {
        screens: {
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
          '2xl': '1536px',
        },
        // Define the custom utilities for font smoothing
        fontSmooth: {
          antialiased: 'antialiased',
          grayscale: 'grayscale',
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
}

