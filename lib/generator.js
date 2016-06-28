import fs from "fs";
import path from "path";
import { sync as mkdirpSync } from "mkdirp";
import { diffLines, structuredPatch } from "diff";
import readlineSync from "readline-sync";
import { template as compileEJS, padStart } from "lodash";
import chalk from "chalk";

import { resolveExternal, exists, formatError } from "./utils";
import * as utils from "./utils";

export default class Generator {
  constructor(templatePath, outputDir, options) {
    this.conflictResolution = {};
    this.templatePath = templatePath;
    this.outputPath = resolveExternal(outputDir);
    this.options = options;
  }

  generate() {
    try {
      return this.generateDirectory(this.templatePath, this.outputPath);
    } catch (error) {
      console.error(formatError(error.message));
    }
  }

  destroy() {
    try {
      this.destroyDirectory(this.templatePath, this.outputPath);
    } catch (error) {
      console.error(formatError(error.message));
    }
  }

  generateDirectory(templatePath, outputPath) {
    let files = fs.readdirSync(templatePath);

    return files.every(name => {
      let inputPath = path.join(templatePath, name);

      if (fs.statSync(inputPath).isFile()) return this.generateFile(inputPath, outputPath);

      // Assuming that this is directory
      let dirname = this.generateBasename(name);
      let childOutputPath = path.join(outputPath, dirname);

      if (exists(childOutputPath)) {
        this.log("exist", childOutputPath);
      } else {
        mkdirpSync(childOutputPath);
        this.log("create", childOutputPath);
      }

      return this.generateDirectory(inputPath, childOutputPath);
    });
  }

  generateFile(templatePath, outputPath) {
    outputPath = path.join(outputPath, this.generateBasename(path.basename(templatePath)));

    let output = this.compileTemplate(fs.readFileSync(templatePath));

    if (exists(outputPath)) {
      let existingContents = fs.readFileSync(outputPath).toString();

      if (existingContents === output) {
        this.log("identical", outputPath);
        return true;
      } else if (!this.conflictResolution.all) {
        this.log("conflict", outputPath);
        this.conflictResolution = this.resolveConflict(outputPath, existingContents, output);

        if (this.conflictResolution.quit) {
          console.log("Exiting...");
          return false;
        }

        if (!this.conflictResolution.force) {
          this.log("skip", outputPath);
          return true;
        }
      }
    }

    fs.writeFileSync(outputPath, output);
    this.log(this.conflictResolution.force ? "force" : "create", outputPath);
    return true;
  }

  destroyDirectory(templatePath, outputPath) {
    let files = fs.readdirSync(templatePath);

    files.forEach(name => {
      let destroyPath = path.join(outputPath, this.generateBasename(name));
      let stat = exists(destroyPath);

      if (!stat) return;

      if (stat.isFile()) {
        fs.unlinkSync(destroyPath);
        this.log("remove", destroyPath);
      } else {
        this.destroyDirectory(path.join(templatePath, name), destroyPath);
      }
    });

    // Don't delete output dir
    if (outputPath === this.outputPath) return;

    if (fs.readdirSync(outputPath).length) {
      // Don't delete nonempty dirs
      this.log("skip", outputPath);
    } else {
      fs.rmdirSync(outputPath);
      this.log("remove", outputPath)
    }
  }

  generateBasename(basename, locals = this.options) {
    const PATH_REGEXP = /__(\w+)__/g;
    return basename.replace(PATH_REGEXP, (m, key) => locals[key]);
  }

  compileTemplate(input) {
    let template = compileEJS(input, { imports: utils })
    return template(this.options);
  }

  resolveConflict(filePath, existingContents, newContents) {
    const ALLOWED_OPTIONS = {
      Y: "yes, overwrite",
      n: "no, do not overwrite",
      a: "all, overwrite this and all others",
      q: "quit, do not overwrite",
      d: "diff, show the differences between the old and the new",
      h: "help, show this help"
    };

    let option = readlineSync.question(
      `Overwrite ${chalk.bold(filePath)}? (enter "h" for help) [${Object.keys(ALLOWED_OPTIONS).join("")}] `,
      {
        limit: Object.keys(ALLOWED_OPTIONS),
        defaultInput: Object.keys(ALLOWED_OPTIONS)[0]
      }
    ).toLowerCase();

    switch (option) {
      case "y":
        return { force: true };
      case "n":
        return { force: false };
      case "a":
        return { force: true, all: true };
      case "q":
        return { quit: true }
      case "d":
        this.printDiff(existingContents, newContents);
        return this.resolveConflict(filePath, existingContents, newContents);
      case "h":
        Object.keys(ALLOWED_OPTIONS).forEach(key => {
          console.log(`${padStart(chalk.bold(key), 13)} — ${ALLOWED_OPTIONS[key]}`);
        });
        return this.resolveConflict(filePath, existingContents, newContents);
    }
  }

  printDiff(oldStr, newStr) {
    let patch = structuredPatch("", "", oldStr, newStr);

    let diff = patch.hunks.reduce((lines, hunk) => lines.concat(hunk.lines.map(line => {
      return (
        line.startsWith("+") ? `${chalk.bold.green("+")}  ${chalk.bold(line.substr(1))}` :
        line.startsWith("-") ? `${chalk.bold.red("-")}  ${chalk.bold(line.substr(1))}` :
        `  ${chalk.gray(line)}`
      );
    })), []).join("\n");

    process.stdout.write(diff);
  }

  log(action, outputPath) {
    outputPath = path.relative(process.cwd(), outputPath);
    const FORMATTED_ACTIONS = {
      create: chalk.bold.green("create"),
      exist: chalk.bold.blue("exist"),
      identical: chalk.bold.blue("identical"),
      skip: chalk.bold.yellow("skip"),
      force: chalk.bold.yellow("force"),
      conflict: chalk.bold.red("conflict"),
      remove: chalk.bold.red("remove")
    };

    console.log(`${padStart(FORMATTED_ACTIONS[action], 30)}  ${outputPath}`);
  }
}
