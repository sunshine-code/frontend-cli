import path from "path";
import { spawnSync } from "child_process";

import Generator from "../../../generator";
import { GENERATE, RUN, getTree, logAction } from "../../../generator/support";

export default class AppGenerator extends Generator {
  constructor(options, templatePath) {
    options.name = path.basename(process.cwd());

    super(options, templatePath, ".");

    this.excludes = this.excludes.concat([
      /\.npmignore/
    ]);

    this.actions = [
      { action: this.install.bind(this), modes: [GENERATE] }
    ];
  }

  * buildTree(mode) {
    let files = getTree(
      path.resolve(__dirname, "templates"),
      this.outputPath,
      this.excludes,
      this.options,
      mode
    );

    yield* files;
    yield* super.buildTree(mode);
  }

  install(mode) {
    logAction(RUN, "npm install");
    spawnSync("npm", ["install"], { stdio: "inherit" });
  }
}
