/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#316FF6",
        secondary: "#6844ED",
        background: "#030014",
        lightGray: "#F5F5F5",
        darkColor: '#0F1011'
      },
      boxShadow: {
        'inset-soft': 'inset 0 0 7.358px 0 rgba(0,0,0,0.15)',
        'custom-deep': '0 65.777px 47.548px 0 rgba(56,56,56,0.08), 0 39.091px 25.86px 0 rgba(56,56,56,0.06), 0 20.297px 13.193px 0 rgba(56,56,56,0.05), 0 8.269px 6.615px 0 rgba(56,56,56,0.04), 0 1.879px 3.195px 0 rgba(56,56,56,0.02)',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        archivo: ['Archivo', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
