const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  theme: {
    container: {
      center: true
    },
    extend: {
      fontFamily: {
        sans: ["Helvetica Neue", "Ubuntu Sans", ...defaultTheme.fontFamily.sans]
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
      }
    }
  },
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  variants: {
    extend: {
      display: ["group-hover"]
    }
  },
  plugins: []
};
