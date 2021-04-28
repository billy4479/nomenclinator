// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/#configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: '/',
    public: {
      url: '/',
      static: true,
    },
  },
  plugins: [
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-postcss',
    //   [
    //     '@snowpack/plugin-optimize',
    //     {
    //       minifyJS: true,
    //       jsOptions: {
    //         module: true,
    //         toplevel: true,
    //         sourceMap: false,
    //         compress: {
    //           ecma: 2019,
    //         },
    //         format: {
    //           ecma: 2019,
    //         },
    //       },
    //       minifyCSS: true,
    //       cssOptions: {
    //         sourceMap: false,
    //         filename: 'styles.css',
    //       },
    //       minifyHTML: true,
    //     },
    //   ],
  ],
  optimize: {
    bundle: true,
    splitting: false,
    manifest: true,
    minify: true,
    treeshake: true,
    target: 'es2020',
  },
  // installOptions: {},
  // devOptions: {},
  // buildOptions: {},
};
