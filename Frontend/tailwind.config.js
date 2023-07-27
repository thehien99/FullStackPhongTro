/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "overlay-30": "rgba(0,0,0,0.3)",
        "overlay-7": "rgba(0,0,0,0.7)",
      },
      maxWidth: {
        "300": "300px",
        "1100": "1100px"
      }
    },
  },
  plugins: [],
};
