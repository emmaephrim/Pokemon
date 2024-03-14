/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        themeBorder: "#868686",
        pokemonImgBg: "#F1F1F1",
      },
    },
  },
  plugins: [require("daisyui")],
  // plugins: [],

  daisyui: {
    themes: [
      {
        primaryTheme: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#e45884",
        },
        secondaryTheme: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#41badd",
        },
        tertiaryTheme: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#daa328",
        },
      },
      "light",
      "dark",
      "cupcake",
    ],
  },
};
