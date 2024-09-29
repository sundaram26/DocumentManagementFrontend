/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'ql-toolbar', 
    'ql-container', 
    'ql-editor', 
    'ql-snow', 
    'ql-picker', 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}