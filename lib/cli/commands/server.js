import * as bundlerOptions from "../options/bundler";
import { SERVER_DEFAULT_PORT, SERVER_DEFAULT_HOST } from "../../constants";
import { symbolizeValues } from "../../utils";
import Server from "../../server";

export const describe = "Run development server";

export const builder = Object.assign({
  port: {
    alias: "p",
    describe: "Set server port",
    group: "Server options:",
    type: "number",
    default: SERVER_DEFAULT_PORT
  },
  binding: {
    alias: "b",
    describe: "Set host bind server to",
    group: "Server options:",
    type: "string",
    default: SERVER_DEFAULT_HOST
  }
}, bundlerOptions);

export function handler(argv) {
  symbolizeValues(argv, "framework", "lang", "styles");
  new Server(argv);
}
