import dotenv from "dotenv";
import del from "rollup-plugin-delete";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";
import json from "@rollup/plugin-json";

dotenv.config();

const devMode = process.env.NODE_ENV === "development";
console.log(`${devMode ? "development" : "production"} mode bundle`);

function terserPlugin() {
  return terser({
    ecma: 2020,
    mangle: { toplevel: true },
    compress: {
      module: true,
      toplevel: true,
      unsafe_arrows: true,
      drop_console: !devMode,
      drop_debugger: !devMode,
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
      { src: "index.html", dest: "dist/" },
      { src: "src/types.d.ts", dest: "dist/types/" },
    ],
  });
}

function delPlugin() {
  return del({ targets: ["dist"] });
}

function jsonPlugin() {
  return json({
    compact: true,
  });
}

function replacePlugin() {
  return replace({ PLATFORM_ENV: "'browser'", GITHUB_PAT: `'${process.env.GITHUB_PAT}'`, preventAssignment: true });
}

export default [
  // CJS
  {
    input: "src/index.ts",
    watch: {
      include: './src/**',
      clearScreen: false
    },
    output: {
      dir: "./dist",
      entryFileNames: "cjs/index.js",
      format: "cjs",
      sourcemap: "inline",
    },
    plugins: [
      jsonPlugin(),
      replacePlugin(),
      typescriptPlugin(),
      commonjs({
        include: "/node_modules/"
      }),
      nodeResolve(),
      copyPlugin("cjs")
    ],
  },

  // ESM
  {
    input: "src/index.ts",
    watch: {
      include: './src/**',
      clearScreen: false
    },
    context: "window",
    output: {
      dir: "./dist",
      entryFileNames: "esm/index.js",
      format: "esm",
      sourcemap: "inline",
    },
    plugins: [
      replacePlugin(),
      typescriptPlugin(),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
      }),
      nodeResolve(),
      jsonPlugin(),
      terserPlugin(),
      copyPlugin("esm"),
    ],
  },
];
