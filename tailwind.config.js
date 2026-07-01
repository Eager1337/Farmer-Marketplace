/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#16a34a", // Green
        earth: "#a16207", // Earth tone
        graybg: "#f3f4f6" // Light gray background
      }
    },
  },
  plugins: [],
}
