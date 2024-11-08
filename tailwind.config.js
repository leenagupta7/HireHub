/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      backgroundColor: {
        'white-50': 'rgba(255, 255, 255, 0.8)',
      },
    },
  },
  plugins: [],
}

