/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.html'],
  css: ['./src/**/*.css'],
});

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('precss'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
