module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        babyblue : '#759FD0',
        skylight : '#ABC3C7',
        grayblue: '#809AB9',
        loginAd: '#4E4A3E',
        bottlegreen: '#1B4332',
    },
  }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
