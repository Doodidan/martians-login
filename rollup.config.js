import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import image from "@rollup/plugin-image";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
// import css from "@modular-css/rollup";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/index.tsx",
  output: {
    file: "public/build/bundle.js",
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      extensions: [".js", ".ts"],
    }),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(
        production ? "production" : "development"
      ),
    }),
    babel({
      presets: ["@babel/preset-react"],
    }),
    commonjs(),
    !production &&
      serve({
        open: true,
        verbose: true,
        contentBase: ["", "public"],
        host: "localhost",
        port: 3000,
      }),
    !production && livereload({ watch: "public" }),
    typescript(),
    image(),
    postcss({
      extensions: [".css"],
      // extract: false,
      modules: true,
      use: ["sass"],
    }),
    production && terser(),
  ],
};
