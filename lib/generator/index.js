import fs from "fs";
import { sync as mkdirpSync } from "mkdirp";
import readlineSync from "readline-sync";
import { padStart } from "lodash";
import chalk from "chalk";

import { resolveExternal, exists, formatError } from "../utils";
import { getTree, logAction, writeFile, showDiff } from "./support";
import UserInterrupt from "./user-interrupt";

export default class Generator {
  constructor(templatePath, outputDir, options) {
    this.templatePath = templatePath;
    this.outputPath = resolveExternal(outputDir);
    this.options = options;
    this.dependentGenerators = [];
  }

  generate() {
    this.tree = this.buildTree();

    try {
      this.generateTree(this.tree);
    } catch (error) {
      this.tree.throw(error);
    }
  }

  destroy() {
    this.tree = this.buildTree(true);

    try {
      this.destroyTree(this.tree);
    } catch (error) {
      this.tree.throw(error);
    }
  }

  * buildTree(reverse) {
    try {
      let tree = getTree(this.templatePath, this.outputPath, this.options, reverse);

      if (!reverse) yield* tree;
      for (let generator of this.dependentGenerators) {
        yield* generator.buildTree(reverse);
      }
      if (reverse) yield* tree;
    } catch (error) {
      if (error instanceof UserInterrupt) {
        console.log("Exiting...");
      } else {
        console.error(formatError(error));
      }
    }
  }

  generateTree(tree) {
    for (let fileOrDir of tree) {
      if (fileOrDir.isDirectory) {
        this.generateDirectory(fileOrDir);
      } else {
        this.generateFile(fileOrDir);
      }
    }
  }

  generateDirectory(dir) {
    if (exists(dir.outputPath)) {
      logAction("exist", dir.outputPath);
    } else {
      mkdirpSync(dir.outputPath);
      logAction("create", dir.outputPath);
    }
  }

  generateFile(file) {
    if (!exists(file.outputPath)) return writeFile(file.outputPath, file.compiledData);

    let existingContents = fs.readFileSync(file.outputPath).toString();

    if (existingContents === file.compiledData) {
      logAction("identical", file.outputPath);
    } else if (this.overwriteAll) {
      writeFile(file.outputPath, file.compiledData, true);
    } else {
      logAction("conflict", file.outputPath);
      this.resolveConflict(file.outputPath, existingContents, file.compiledData);
    }
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
      case "a":
        this.overwriteAll = true;
      case "y":
        writeFile(filePath, newContents, true);
        break;
      case "n":
        logAction("skip", filePath);
        break;
      case "q":
        this.tree.throw(new UserInterrupt());
        break;
      case "d":
        showDiff(existingContents, newContents);
        this.resolveConflict(filePath, existingContents, newContents);
        break;
      case "h":
        Object.keys(ALLOWED_OPTIONS).forEach(key => {
          console.log(`${padStart(chalk.bold(key), 13)} — ${ALLOWED_OPTIONS[key]}`);
        });

        this.resolveConflict(filePath, existingContents, newContents);
    }
  }

  destroyTree(tree) {
    for (let fileOrDir of tree) {
      if (fileOrDir.isDirectory) {
        this.destroyDirectory(fileOrDir.outputPath);
      } else {
        this.destroyFile(fileOrDir.outputPath);
      }
    }
  }

  destroyDirectory(dirPath) {
    if (fs.readdirSync(dirPath).length) {
      // Don't delete nonempty dirs
      logAction("skip", dirPath);
    } else {
      fs.rmdirSync(dirPath);
      logAction("remove", dirPath);
    }
  }

  destroyFile(filePath) {
    fs.unlinkSync(filePath);
    logAction("remove", filePath);
  }
}
