import { SERVER_DEFAULT_PORT, SERVER_DEFAULT_HOST } from "../constants";
import { symbolizeValues } from "../utils";
import Server from "../server";

export const command = "server";

export const describe = "Run development server"

export const builder = {
  port: {
    alias: "p",
    describe: "Set server port",
    type: "number",
    default: SERVER_DEFAULT_PORT
  },
  binding: {
    alias: "b",
    describe: "Set host bind server to",
    type: "string",
    default: SERVER_DEFAULT_HOST
  }
}

export function handler(argv) {
  symbolizeValues(argv, "framework", "lang", "styles");
  new Server(argv);
}
