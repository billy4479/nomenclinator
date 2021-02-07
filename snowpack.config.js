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
  scripts: {
    'run:tsc': 'tsc --noEmit',
    'run:tsc::watch': '$1 --watch',
  },
  plugins: [
    [
      '@snowpack/plugin-sass',
      {
        style: 'collapsed',
        sourceMap: false,
      },
    ],
  ],
  experiments: {
    optimize: {
      bundle: true,
      splitting: false,
      manifest: true,
      minify: true,
      treeshake: true,
      target: 'es2020',
    },
  },
  // installOptions: {},
  // devOptions: {},
  // buildOptions: {},
};
