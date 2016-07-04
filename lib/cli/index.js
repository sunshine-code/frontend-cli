import yargs from "yargs";

import {
  REACT,
  JAVASCRIPT,
  TYPESCRIPT,
  SCSS,
  POSTCSS
} from "../constants";

import { loadRC } from "../utils";
import * as generateCommand from "./commands/generate";
import * as destroyCommand from "./commands/destroy";
import * as buildCommand from "./commands/build";
import * as serverCommand from "./commands/server";

const ALLOWED_FRAMEWORKS = [REACT].map(Symbol.keyFor);
const ALLOWED_LANGUAGES = [JAVASCRIPT, TYPESCRIPT].map(Symbol.keyFor);
const ALLOWED_STYLES = [SCSS, POSTCSS].map(Symbol.keyFor);

let cli = yargs
  .usage("$0 command [args]")

  .help()
  .alias("help", "h", "?")

  .version()
  .alias("version", "v")

  .option("framework", {
    alias: "fw",
    description: "Set app framework",
    group: "Application options:",
    choices: ALLOWED_FRAMEWORKS,
    global: true
  })

  .option("lang", {
    alias: "l",
    description: "Set app language",
    group: "Application options:",
    choices: ALLOWED_LANGUAGES,
    global: true
  })

  .option("styles", {
    alias: "s",
    description: "Set app styles syntax, if false — don't build/generate styles at all",
    group: "Application options:",
    choices: [...ALLOWED_STYLES, false],
    global: true
  })

  .default(loadRC())

  .command(generateCommand)
  .command(destroyCommand)
  .command(buildCommand)
  .command(serverCommand)

  .strict();

let argv = cli.argv;

if (!argv._.length) cli.showHelp();
