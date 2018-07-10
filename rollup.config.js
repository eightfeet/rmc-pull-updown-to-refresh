import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import ignore from 'rollup-plugin-ignore';
import scss from 'rollup-plugin-scss';
import url from 'rollup-plugin-url';
import postcss from 'rollup-plugin-postcss';

const devConfig = {
  input: 'src/index.js',
  output: {
    file: 'lib/rmc-pull-updown-to-refresh.development.js',
    format: 'umd',
    name: 'ReactPullToRefresh',
    globals: {
      'prop-types': 'PropTypes',
      react: 'React',
    },
    sourcemap: true,
  },
  plugins: [
    commonjs({ exclude: 'src/**' }),
    scss({
      output: 'lib/bundle.css',
    }),
    nodeResolve(),
    babel(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    url({
      limit: 10 * 1024, // inline files < 10k, copy files > 10k
      include: ['**/*.svg'], // defaults to .svg, .png, .jpg and .gif files
      emitFiles: true, // defaults to true
    }),
    postcss({
      modules: true,
    }),
  ],
  external: ['prop-types', 'react'],
};

const productionConfig = {
  input: 'src/index.js',
  output: {
    file: 'lib/rmc-pull-updown-to-refresh.production.min.js',
    format: 'umd',
    name: 'ReactPullToRefresh',
    globals: {
      react: 'React',
    },
    sourcemap: true,
  },
  plugins: [
    ignore(['prop-types']),
    commonjs({ exclude: 'src/**' }),
    scss({
      output: 'lib/bundle.css',
    }),
    nodeResolve(),
    babel({ plugins: ['transform-react-remove-prop-types'] }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    uglify(),
    url({
      limit: 10 * 1024, // inline files < 10k, copy files > 10k
      include: ['**/*.svg'], // defaults to .svg, .png, .jpg and .gif files
      emitFiles: true, // defaults to true
    }),
    postcss({
      modules: true,
    }),
  ],
  external: ['react'],
};

export default [devConfig, productionConfig];
