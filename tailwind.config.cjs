/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-coral": "#798F8B", // was light-pink
        "dark-coral": "#4E6561", // was blue
        bordeaux: "#B04C48", // was light-blue
        "light-red": "#C45854", // was burgundy
        "dark-red": "#b0413e", // was dark-pink
        creme: "#FFF0C7", // was light-grey
        "dark-creme": "#E8DEA9",
      },
      fontFamily: {
        firasans: ["Fira Sans", "sans-serif"],
        exo: ["Exo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
