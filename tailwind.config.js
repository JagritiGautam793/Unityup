/** @type {import('tailwindcss').Config} */
module.exports = { 
  // in this we are just telling that in particular files we need to apply tailwind css inside apps
  content: ["./App.{js,jsx,ts,tsx}", "./Apps/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

