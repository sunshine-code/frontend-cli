import * as webpackOptions from "../options/webpack";
import { DEVELOPMENT, TEST, PRODUCTION } from "../../constants";
import { symbolizeValues } from "../../utils";
import Webpack from "../../webpack";

const ALLOWED_ENVIRONMENTS = [DEVELOPMENT, TEST, PRODUCTION].map(Symbol.keyFor);
const NODE_ENV = process.env.NODE_ENV;

export const describe = "Build app";

export const builder = Object.assign({
  env: {
    alias: "e",
    describe: "Set build environment",
    group: "Build options:",
    choices: ALLOWED_ENVIRONMENTS,
    default: ALLOWED_ENVIRONMENTS.includes(NODE_ENV) ? NODE_ENV : Symbol.keyFor(DEVELOPMENT)
  },
  watch: {
    alias: "w",
    describe: "Run in the watch mode",
    group: "Build options:",
    type: "boolean"
  }
}, webpackOptions);

export function handler(argv) {
  symbolizeValues(argv, "env", "framework", "lang", "styles");

  let webpack = new Webpack(argv);

  if (argv.watch) {
    webpack.watch();
  } else {
    webpack.run();
  }
}