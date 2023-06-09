const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  theme: {
    container: {
      center: true,
    },
    screens: {
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px",
      "3xl": "2560px",
      "4xl": "3600px"

    },
    extend: {
      fontFamily: {
        sans: ["Helvetica Neue", "Ubuntu Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        background: "var(--background)",
        accent: "var(--accent)",
        cards: "var(--cards)",
        foreground: "var(--fg)",
        sforeground: "var(--sfg)",
        imggradient: "var(--imgcol)",
        darkbackground: "var(--darkbackground)",
        darkaccent: "var(--darkaccent)",
        darkcards: "var(--darkcards)",
        darkforeground: "var(--darkfg)",
        darksforeground: "var(--darksfg)",
        darkimggradient: "var(--darkimgcol)",
      },
    },
  },
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [],
};
