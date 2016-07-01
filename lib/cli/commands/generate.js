import { resolveInternal } from "../../utils";

let cli;

export const describe = "Generate new code";

export function builder(yargs) {
  cli = yargs;

  cli
    .commandDir(resolveInternal("lib", "cli", "commands", "generate", cli.argv.framework))
    .commandDir(resolveInternal("lib", "cli", "commands", "generate", "common"));

  return cli;
}

export function handler(argv) {
  if (argv._.length < 2) cli.showHelp();
}
