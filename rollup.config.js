import dotenv from "dotenv";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";
import json from "@rollup/plugin-json";

dotenv.config();

const prodMode = process.env.NODE_ENV === "production";
console.log(`${!prodMode ? "development" : "production"} mode bundle`);

function terserPlugin() {
  return terser({
    ecma: 2020,
    mangle: { toplevel: true },
    compress: {
      module: true,
      toplevel: true,
      unsafe_arrows: true,
      drop_console: prodMode,
      drop_debugger: prodMode,
    },
    output: { quote_style: 1 },
  });
}

function typescriptPlugin() {
  return typescript({
    tsconfig: "./tsconfig.json",
    declaration: true,
    declarationDir: "./dist/types",
    rootDir: "src/",
    exclude: ["**/*.spec.ts"],
  });
}

function copyPlugin(format) {
  return copy({
    targets: [
      { src: "src/data/frameworks.json", dest: `dist/${format}/data/` },
      { src: "src/index.ts", dest: "dist/" },
      { src: "src/types.d.ts", dest: "dist/types/" },
    ],
  });
}


function jsonPlugin() {
  return json({
    compact: true,
  });
}

function nodePlugin() {
  return nodeResolve({
    browser: true
  });
}

export default [
  // CJS
  {
    input: "src/index.ts",
    // watch: {
    //   include: './src/**',
    //   clearScreen: false
    // },
    output: {
      //dir: "./dist",
      // entryFileNames: "cjs/index.js",
      file: "bundle.js",
      format: "cjs",
      sourcemap: "inline",
    },
    plugins: [
      typescriptPlugin(),
      commonjs(),
      jsonPlugin(),
      nodePlugin(),
      copyPlugin("cjs"),
    ],
  },

  // ESM
  {
    input: "src/index.ts",
    // watch: {
    //   include: './src/**',
    //   clearScreen: false
    // },
    context: "window",
    output: {
      // dir: "./dist",
      // entryFileNames: "esm/index.js",
      file: "bundle.js",
      format: "esm",
      sourcemap: "inline",
    },
    plugins: [
      typescriptPlugin(),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
      }),
      jsonPlugin(),
      nodePlugin(),
      terserPlugin(),
      copyPlugin("esm"),
    ],
  },
];
