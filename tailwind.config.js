/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blue: '#93c5fd',
        grey: '#f5f5f5',
        green: '#86efac',
        navy: '#2e3b52',
        'navy-light': 'rgba(46,59,82,0.6)'
      },
      fontFamily: {
        nunito: ['Nunito']
      }
    }
  },
  plugins: []
};
