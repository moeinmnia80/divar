/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      screens: {
        sm: "300px",
        md: "600px",
        lg: "90000px",
        xl: "1200px",
        "2xl": "1400px",
      },
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ["Vazir"],
      },
      colors: {
        primary: "#a62626",
        secondary: "#1a1a1d",
        third: "#a6262611",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
