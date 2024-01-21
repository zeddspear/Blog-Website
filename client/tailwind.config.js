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
        primaryMain: "#802392",
        secondaryMain: "#A0B9C6",
        tertiaryMain: "#011936",
        lightBrownMain: "#917164",
        UlightBrownMain: "#AD8174",
        surface: "#141414",
        grayMain: "#0000006c",
      },
    },
  },
  plugins: [],
};
