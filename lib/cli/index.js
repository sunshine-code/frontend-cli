import yargs from "yargs";
import path from "path";

import {
  REACT,
  JAVASCRIPT,
  TYPESCRIPT,
  SCSS,
  POSTCSS
} from "../constants";
import { resolveInternal } from "../utils";

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
    default: Symbol.keyFor(REACT),
    global: true
  })

  .option("lang", {
    alias: "l",
    description: "Set app language",
    group: "Application options:",
    choices: ALLOWED_LANGUAGES,
    default: Symbol.keyFor(JAVASCRIPT),
    global: true
  })

  .option("styles", {
    alias: "s",
    description: "Set app styles syntax",
    group: "Application options:",
    choices: ALLOWED_STYLES,
    default: Symbol.keyFor(SCSS),
    global: true
  })

  .commandDir(path.resolve(__dirname, "commands"))
  .strict();

let argv = cli.argv;

if (!argv._.length) cli.showHelp();
