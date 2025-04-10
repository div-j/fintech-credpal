/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter'], // Set Inter as the default sans-serif font
      },
    },
  },
  plugins: [
    daisyui
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}

