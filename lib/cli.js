import yargs from "yargs";

let cli = yargs
  .usage("$0 command [args]")
  .help()
  .alias("help", "h", "?")
  .version()
  .alias("version", "v")
  .commandDir("lib/commands")
  .strict();

let argv = cli.argv;

if (!argv._.length) cli.showHelp();
