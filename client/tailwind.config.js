/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      boxShadow: {
        "3xl": "0 45px 65px -12px rgba(0, 0, 0, 0.6)",
      },
      colors: {
        primaryMain: "#ce7b91",
        secondaryMain: "#1A281F",
        tertiaryMain: "#EBEBEB",
        lightBrownMain: "#917164",
        UlightBrownMain: "#AD8174",
        surface: "#141414",
        grayMain: "#0000006c",
      },
    },
  },
  plugins: [],
};
