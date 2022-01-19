import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import svg from 'rollup-plugin-svg';
import { terser } from "rollup-plugin-terser";


const packageJson = require("./package.json");

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs"
    },
    {
      file: packageJson.module,
      format: "esm"
    }
  ],
  plugins: [
    peerDepsExternal(),
    terser(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss({
      modules: true,
      minimize: true,
    }),
    svg()
  ]
};
