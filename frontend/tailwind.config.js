/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors : {
        borderColor : '#BDBDBD',
        mainTitleColor : '#333333',
        inputColor : '#828282',
        submitBtnBg : '#2F80ED',
        redirectingLinkBg : '#2D9CDB',
        hoverSubmitBtnsBg : '#F0402C',
      },
      fontFamily : {
        NotoFont : ['Noto Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
