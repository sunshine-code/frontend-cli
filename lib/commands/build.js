import { DEVELOPMENT, TEST, PRODUCTION } from "../constants";
import Webpack from "../webpack";

const ALLOWED_ENVIRONMENTS = [DEVELOPMENT, TEST, PRODUCTION];
const NODE_ENV = process.env.NODE_ENV;

export const command = "build";

export const describe = "Build app"

export const builder = {
  env: {
    alias: "e",
    describe: "Set build environment",
    choices: ALLOWED_ENVIRONMENTS,
    default: ALLOWED_ENVIRONMENTS.includes(NODE_ENV) ? NODE_ENV : DEVELOPMENT
  }
}

export function handler(argv) {
  new Webpack(argv);
}
