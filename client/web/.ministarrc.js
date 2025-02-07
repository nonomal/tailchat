const copy = require('rollup-plugin-copy');
const replace = require('rollup-plugin-replace');
const sourceRef = require('rollup-plugin-source-ref').default;
const path = require('path');
const normalize = require('normalize-path');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  externalDeps: [
    'react',
    'react-router',
    'axios',
    'styled-components',
    'zustand',
    'zustand/middleware/immer',
  ],
  rollupPlugins: ({ pluginName }) => [
    copy({
      targets: [
        {
          src: path.resolve(
            __dirname,
            `./plugins/${pluginName}`,
            './assets/**/*'
          ),
          dest: path.resolve(__dirname, `./dist/plugins/${pluginName}/assets/`),
        },
        {
          src: path.resolve(
            __dirname,
            `./plugins/${pluginName}`,
            './docs/**/*'
          ),
          dest: path.resolve(__dirname, `./dist/plugins/${pluginName}/docs/`),
        },
        {
          src: path.resolve(
            __dirname,
            `./plugins/${pluginName}`,
            './README.md'
          ),
          dest: path.resolve(__dirname, `./dist/plugins/${pluginName}/`),
        },
      ].map((item) => ({
        // For windows
        src: normalize(item.src),
        dest: normalize(item.dest, false),
      })),
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  buildRollupPlugins(plugins) {
    if (isDev) {
      return [
        sourceRef(), // make sure to change to source
        ...plugins,
      ];
    }

    return plugins;
  },
};
