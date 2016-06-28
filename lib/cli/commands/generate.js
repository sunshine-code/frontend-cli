import path from "path";

let cli;

export const describe = "Generate new code";

export function builder(yargs) {
  cli = yargs;

  cli
    .commandDir(path.join("generate", "common"))
    .commandDir(path.join("generate", cli.argv.framework));

  return cli;
}

export function handler(argv) {
  if (argv._.length < 2) cli.showHelp();
}
