import { resolveInternal } from "../../utils";

let cli;

export const describe = "Undo generated code";

export function builder(yargs) {
  cli = yargs;

  cli
    .commandDir(resolveInternal("lib", "cli", "commands", "destroy", cli.argv.framework))
    .commandDir(resolveInternal("lib", "cli", "commands", "destroy", "common"));

  return cli;
}

export function handler(argv) {
  if (argv._.length < 2) cli.showHelp();
}
