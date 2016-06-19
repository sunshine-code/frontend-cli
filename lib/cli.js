import yargs from "yargs";

import { REACT } from "./constants";

let cli = yargs
  .usage("$0 command [args]")
  .help()
  .alias("help", "h", "?")
  .version()
  .alias("version", "v")
  .default("framework", REACT)
  .global("framework")
  .commandDir("lib/commands")
  .strict();

let argv = cli.argv;

if (!argv._.length) cli.showHelp();
