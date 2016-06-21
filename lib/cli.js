import yargs from "yargs";

import { REACT } from "./constants";
import { resolveInternal } from "./utils";

const ALLOWED_FRAMEWORKS = [REACT].map(Symbol.keyFor);

let cli = yargs
  .usage("$0 command [args]")
  .help()
  .alias("help", "h", "?")
  .version()
  .alias("version", "v")
  .option("framework", {
    alias: "fw",
    description: "Set app framework",
    choices: ALLOWED_FRAMEWORKS,
    default: Symbol.keyFor(REACT),
    global: true
  })
  .commandDir(resolveInternal("lib", "commands"))
  .strict();

let argv = cli.argv;

if (!argv._.length) cli.showHelp();
