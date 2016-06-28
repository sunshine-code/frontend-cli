import path from "path";

let cli;

export const describe = "Undo generated code";

export function builder(yargs) {
  cli = yargs;

  cli
    .commandDir(path.join("destroy", "common"))
    .commandDir(path.join("destroy", cli.argv.framework));

  return cli;
}

export function handler(argv) {
  if (argv._.length < 2) cli.showHelp();
}
