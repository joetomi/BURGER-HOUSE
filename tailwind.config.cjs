/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0F0F0F",
          secondaryBg: "#171717",
          text: "#FFFFFF",
          secondaryText: "#C7C7C7",
          accent: "#D4A017",
          accentHover: "#F2B94B",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        cairo: ["Cairo", "sans-serif"],
      },
    },
  },
  plugins: [],
}
