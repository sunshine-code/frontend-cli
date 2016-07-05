// Environments
export const DEVELOPMENT = Symbol.for("development");
export const PRODUCTION = Symbol.for("production");
export const TEST = Symbol.for("test");

// Frameworks
export const REACT = Symbol.for("react");

// Languages
export const JAVASCRIPT = Symbol.for("javascript");
export const TYPESCRIPT = Symbol.for("typescript");

// Styles
export const SCSS = Symbol.for("scss");
export const POSTCSS = Symbol.for("postcss");

// Paths and files
export const ENTRY_PATH = "./app";
export const OUTPUT_PATH = "./public";

// Webpack
export const WEBPACK_STATS = Object.freeze({
  colors: true,
  assets: false,
  chunkModules: false,
  children: false
});

// Server
export const SERVER_DEFAULT_PORT = 3000;
export const SERVER_DEFAULT_HOST = "localhost";
