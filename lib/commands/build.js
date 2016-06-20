import { DEVELOPMENT, TEST, PRODUCTION } from "../constants";
import Webpack from "../webpack";

const ALLOWED_ENVIRONMENTS = [DEVELOPMENT, TEST, PRODUCTION].map(Symbol.keyFor);
const NODE_ENV = process.env.NODE_ENV;

export const command = "build";

export const describe = "Build app"

export const builder = {
  env: {
    alias: "e",
    describe: "Set build environment",
    choices: ALLOWED_ENVIRONMENTS,
    default: ALLOWED_ENVIRONMENTS.includes(NODE_ENV) ? NODE_ENV : Symbol.keyFor(DEVELOPMENT)
  }
}

export function handler(argv) {
  // Symbolize argument values
  Object.assign(argv, {
    env: Symbol.for(argv.env),
    framework: Symbol.for(argv.framework)
  });

  new Webpack(argv).run();
}
