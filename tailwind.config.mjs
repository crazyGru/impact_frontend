/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderWidth: {
        1: '1px'
      },
      fontFamily: {
        Inter: 'inter, sans-serif'
      }
    }
  },
  plugins: []
}
