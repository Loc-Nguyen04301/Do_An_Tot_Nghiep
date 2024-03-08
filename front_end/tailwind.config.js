/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "border-color": "#ececec",
        "main-orange-color": "#F48220",
        "bold-main-orange-color": "#B66118",
        "button-red-color": "#fe0000",
        "main-grey-color": "#666666d9",
        "footer-bg": "#273647",
        "text-gray": "#666666d9",
        "category-title": "#555555",
        "placeholder-color": "#4e4d4d",
      },
      screens: {
        xs: "576px",
        sm: "600px",
        // => @media (min-width: 576px) { ... }
        md: "850px",
        // => @media (min-width: 850px) { ... }
      },
      boxShadow: {
        "search-box": "0 0 10px 0 rgba(0,0,0,.1);",
        "checkout-btn": "inset 0 0 0 100px rgba(0,0,0,.2);",
      },
    },
  },
  plugins: [],
}
