import * as bundlerOptions from "../options/bundler";
import { DEVELOPMENT, TEST, PRODUCTION } from "../../constants";
import { symbolizeValues } from "../../utils";
import Bundler from "../../bundler";

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
}, bundlerOptions);

export function handler(argv) {
  symbolizeValues(argv, "env", "framework", "lang", "styles");

  const bundler = new Bundler(argv);

  if (argv.watch) {
    bundler.watch();
  } else {
    bundler.run();
  }
}
