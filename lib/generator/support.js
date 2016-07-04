import fs from "fs";
import path from "path";
import { template as compileEJS, padStart } from "lodash";
import chalk from "chalk";
import { diffLines } from "diff";

import { compareSymbolOrString, formatError } from "../utils";
import * as utils from "../utils";
import UserInterrupt from "./user-interrupt";

// Modes
export const GENERATE = Symbol.for("generator.mode.generate");
export const DESTROY = Symbol.for("generator.mode.destroy");

// Actions
export const CREATE = Symbol.for("generator.action.create");
export const APPEND = Symbol.for("generator.action.append");
export const RUN = Symbol.for("generator.action.run");
export const EXIST = Symbol.for("generator.action.exist");
export const IDENTICAL = Symbol.for("generator.action.identical");
export const SKIP = Symbol.for("generator.action.skip");
export const FORCE = Symbol.for("generator.action.force");
export const CONFLICT = Symbol.for("generator.action.conflict");
export const REMOVE = Symbol.for("generator.action.remove");
export const TRUNCATE = Symbol.for("generator.action.truncate");

export function isGenerate(mode) {
  return compareSymbolOrString(GENERATE, mode);
}

export function isDestroy(mode) {
  return compareSymbolOrString(DESTROY, mode);
}

export function* getTree(srcPath, destPath, excludes, templateLocals, mode, currentPath = ".") {
  let files = fs.readdirSync(path.join(srcPath, currentPath));

  for (let file of files) {
    let filePath = path.join(currentPath, file);

    /**
     * NOTE: In the destroy mode we aren't excluding anything from the tree.
     * These files will be ignored in the case of its nonexistence.
     */
    if (isGenerate(mode) && excludes.some(e => e.test(filePath))) continue;

    file = getMetadata(filePath, srcPath, destPath, templateLocals, mode);

    if (isGenerate(mode)) yield file;
    if (file.isDirectory) yield* getTree(srcPath, destPath, excludes, templateLocals, mode, filePath);
    if (isDestroy(mode)) yield file;
  }
}

function getMetadata(filePath, srcPath, destPath, templateLocals, mode) {
  let templatePath = path.join(srcPath, filePath);
  let outputPath = path.join(destPath, compileName(filePath, templateLocals));
  let isDirectory = fs.statSync(templatePath).isDirectory();
  let compiledData = !isDirectory && isGenerate(mode) &&
    compileTemplate(fs.readFileSync(templatePath), templateLocals);

  return { templatePath, outputPath, isDirectory, compiledData };
}

function compileName(basename, locals) {
  const PATH_REGEXP = /__(\w+)__/g;
  return basename.replace(PATH_REGEXP, (m, key) => locals[key]);
}

function compileTemplate(input, locals) {
  let template = compileEJS(input, { imports: utils });
  return template(locals);
}

export function writeFile(filePath, data, overwrite) {
  fs.writeFileSync(filePath, data);
  logAction(overwrite ? FORCE : CREATE, filePath);
}

export function logAction(action, outputPath) {
  let externalPath = path.relative(process.cwd(), outputPath);

  const FORMATTED_ACTIONS = {
    [CREATE]: chalk.bold.green("create"),
    [APPEND]: chalk.bold.green("append"),
    [RUN]: chalk.bold.green("run"),
    [EXIST]: chalk.bold.blue("exist"),
    [IDENTICAL]: chalk.bold.blue("identical"),
    [SKIP]: chalk.bold.yellow("skip"),
    [FORCE]: chalk.bold.yellow("force"),
    [CONFLICT]: chalk.bold.red("conflict"),
    [REMOVE]: chalk.bold.red("remove"),
    [TRUNCATE]: chalk.bold.red("truncate")
  };

  console.log(`${padStart(FORMATTED_ACTIONS[action], 30)}  ${externalPath}`);
}

export function handleError(error) {
  if (error instanceof UserInterrupt) {
    console.log("Exiting...");
  } else {
    console.error(formatError(error));
  }
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
