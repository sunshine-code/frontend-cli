import path from "path";
import { spawnSync } from "child_process";

import Generator from "../../generator";
import { GENERATE, RUN, logAction } from "../../generator/support";

export default class AppGenerator extends Generator {
  constructor(templatePath, options) {
    options.name = options.name || path.basename(process.cwd());

    super(options, templatePath, ".");

    this.excludes = this.excludes.concat([
      !options.git && /\.gitignore/
    ].filter(Boolean));

    this.actions = [
      { action: this.install.bind(this), modes: [GENERATE] }
    ];
  }

  install(mode) {
    if (!this.options.install) return;

    logAction(RUN, "npm install");
    spawnSync("npm", ["install"], { stdio: "inherit" });
  }
}
