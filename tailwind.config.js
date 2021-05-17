module.exports = {
  purge: {
    content: ['./src/**/*.html', './src/**/*.css'],

    options: {
      safelist: ['text-gray-900', 'dark:bg-gray-900', 'dark:text-gray-100'],
    },
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
