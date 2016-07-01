import fs from "fs";
import path from "path";
import { template as compileEJS, padStart } from "lodash";
import chalk from "chalk";
import { diffLines } from "diff";

import * as utils from "../utils";

export function* getTree(srcPath, destPath, templateLocals, reverse, currentPath = ".") {
  let files = fs.readdirSync(path.join(srcPath, currentPath));

  for (let file of files) {
    let filePath = path.join(currentPath, file);
    let templatePath = path.join(srcPath, filePath);
    let outputPath = path.join(destPath, compileName(filePath, templateLocals));
    let isDirectory = fs.statSync(templatePath).isDirectory();
    let compiledData = !isDirectory && compileTemplate(fs.readFileSync(templatePath), templateLocals);

    file = { templatePath, outputPath, isDirectory, compiledData };

    if (!reverse) yield file;
    if (isDirectory) yield* getTree(srcPath, destPath, templateLocals, reverse, filePath);
    if (reverse) yield file;
  }
}

export function compileName(basename, locals) {
  const PATH_REGEXP = /__(\w+)__/g;
  return basename.replace(PATH_REGEXP, (m, key) => locals[key]);
}

export function compileTemplate(input, locals) {
  let template = compileEJS(input, { imports: utils });
  return template(locals);
}

export function writeFile(filePath, data, overwrite) {
  fs.writeFileSync(filePath, data);
  logAction(overwrite ? "force" : "create", filePath);
}

export function logAction(action, outputPath) {
  let externalPath = path.relative(process.cwd(), outputPath);

  const FORMATTED_ACTIONS = {
    create: chalk.bold.green("create"),
    exist: chalk.bold.blue("exist"),
    identical: chalk.bold.blue("identical"),
    skip: chalk.bold.yellow("skip"),
    force: chalk.bold.yellow("force"),
    conflict: chalk.bold.red("conflict"),
    remove: chalk.bold.red("remove")
  };

  console.log(`${padStart(FORMATTED_ACTIONS[action], 30)}  ${externalPath}`);
}

export function showDiff(oldStr, newStr) {
  const NO_EOF_NEWLINE = "\n\\ No newline at end of file\n";

  // Check newline at EOF
  [oldStr, newStr] = [oldStr, newStr].map(str => (
    str.endsWith("\n") ? str : str.concat(NO_EOF_NEWLINE)
  ));

  let parts = diffLines(oldStr, newStr);

  let diff = parts.reduce((str, part, i) => str.concat(
    part.value.replace(/[^\n]*\n/g, line => (
      part.added ? `${chalk.bold.green("+")}  ${chalk.bold(line)}` :
      part.removed ? `${chalk.bold.red("-")}  ${chalk.bold(line)}` :
      `   ${chalk.gray(line)}`
    ))
  ), "");

  diff.match(/[^\n]*\n?/g).forEach(line => process.stdout.write(line));
}
