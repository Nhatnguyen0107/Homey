// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
  // ... other Tailwind CSS configurations
  //   daisyui: {
  //     themes: [
  //       {
  //         light: {
  //           ...require("daisyui/src/theming/themes")["[data-theme=light]"], // Import default light theme
  //           "base-content": "#ff0000", // Change base-content to red
  //         },
  //       },
  //       // ... other themes
  //     ],
  //   },
  //   plugins: [require("daisyui")],
  // tailwindcss: {},
  // autoprefixer: {},
};
