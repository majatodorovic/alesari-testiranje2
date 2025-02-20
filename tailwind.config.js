/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1600px",
        "4xl": "1920px",
      },
      colors: {
        primary: "#af9c6d",
        secondary: "#f2f2f2",
      },
      fontFamily: {
        serif: ["var(--font-oldstandard)"],
        sans: ["var(--font-century)"],
      },
      aspectRatio: {
        "2/3": "2/3",
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
