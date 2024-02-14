/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./pages/**/*.jsx", "./components/**/*.jsx"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-grey": "#212529",
        "custom-green": "#33332d",
      },
      colors: {
        "custom-grey": "#212529",
        "gun-mental": "#2b303a",
      },
      boxShadow: {
        myShadow1: "4.1px -5px 0 0 rgb(17,24,39)",
        myShadow2: "-4.1px -5px 0 0 rgb(17,24,39)",
      },
    },
  },
  plugins: [],
};
