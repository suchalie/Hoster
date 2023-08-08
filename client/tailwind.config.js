/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#060047',
        secondary:'#FC5185',
        linksCol : '#0D8ABC',
        tertiary: '#18587A'
      }
    },
  },
  plugins: [],
}

