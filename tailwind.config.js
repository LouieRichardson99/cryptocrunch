module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        darkerGray: "#0a071b",
        darkGray: "#2a263f",
        lightBlue: "#5ec6e8",
        darkBlue: "#4da1c0",
        darkPurple: "#5138ee",
      },
      screens: {
        "sm-navbar": "576px",
      },
      animation: {
        ping: "ping 400ms cubic-bezier(0.4, 0, 0.6, 1)",
      },
      keyframes: {
        ping: {
          "75%, 100%": { transform: "scale(1.5)", opacity: "0" },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
