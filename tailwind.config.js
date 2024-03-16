/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        themeBorder: "#868686",
        pokemonImgBg: "#F1F1F1",
        firstColor: "#e45884",
        secondColor: "#41badd",
        thirdColor: "#daa328",
        modelBgBackup: "#939393",
        modelBackground: "#27272780",
        colorsBg: "#EBEBEB",
        aboutStatsSimilarBg: "#e9e9e9",
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
          body: {
            "background-color": "transparent",
          },
          main: {
            "background-color": "transparent",
            // height: "100vh",
          },
        },
        secondaryTheme: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#41badd",
          body: {
            "background-color": "transparent",
            // /* background-image: url("../images/background-image.png");
          },
          main: {
            "background-color": "transparent",
            // height: "100vh",
          },
        },
        tertiaryTheme: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#daa328",
          body: {
            "background-color": "transparent",
          },
          main: {
            "background-color": "transparent",
            // height: "100vh",
          },
        },
      },
      "light",
      "dark",
      "cupcake",
    ],
  },
};
