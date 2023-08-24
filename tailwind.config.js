/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blue: '#93c5fd',
        grey: '#f5f5f5'
      },
      fontFamily: {
        nunito: ['Nunito']
      }
    }
  },
  plugins: []
};
