/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./build/*.html"],
  theme: {
    extend: {
      backgroundImage: {
        "todo-header": "url('../images/bg-desktop-dark.jpg')",
        "check-bg": "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
      },
      colors: {
        "bright-blue": "hsl(220, 98%, 61%)",
        "v-light-gray": "hsl(0, 0%, 98%)",
        "v-light-grayish-blue": "hsl(236, 33%, 92%)",
        "l-grayish-blue": "hsl(233, 11%, 84%)",
        "d-grayish-blue": "hsl(236, 9%, 61%)",
        "v-d-grayish-blue": "hsl(235, 19%, 35%)",
        "dark-theme-v-d-blue": "hsl(235, 21%, 11%)",
        "dark-theme-v-d-desaturated-blue": "hsl(235, 24%, 19%)",
        "dark-theme-l-grayish-blue": "hsl(234, 39%, 85%)",
        "dark-theme-l-grayish-blue-(hover)": "hsl(236, 33%, 92%)",
        "dark-theme-d-grayish-blue": "hsl(234, 11%, 52%)",
        "dark-theme-v-d-grayish-blue": "hsl(233, 14%, 35%)",
        "dark-theme-v-d-grayish-blue": "hsl(237, 14%, 26%)",
      },
    },
  },
  plugins: [],
};
