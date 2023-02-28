/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./src/**/*.{html,jsx,js}" , 
  './pages/**/*.{html,jsx,js}',
  './components/**/*.{html,jsx,js}',],
  theme: {
    extend: {
      colors : {
        borderColor : '#BDBDBD',
        mainTitleColor : '#333333',
        inputColor : '#828282',
        submitBtnBg : '#2F80ED',
        redirectingLinkBg : '#2D9CDB',
        hoverSubmitBtnsBg : '#F0402C',
        navBarBorderBg : '#F2F2F2',
        userHolder : '#BDBDBD',
        userDropDownNameHolderColor : '#333333',
        DropDownBorderColor : ' #E0E0E0',
        optionColor : '#4F4F4F',
        logOutWarning : '#EB5757',
      },
      fontFamily : {
        NotoFont : ['Noto Sans', 'sans-serif'],
      },
      boxShadow : {
        UserDropDown : '0px 2px 4px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
