import path from "path";

import Generator from "../../../generator";
import ComponentGenerator from "../component";
import { resolveExternal } from "../../../utils";

export default class AppGenerator extends Generator {
  constructor(options) {
    options.name = options.name || path.basename(process.cwd());

    super(path.resolve(__dirname, "templates"), ".", options);

    this.dependentGenerators = [
      new ComponentGenerator({ name: "App" })
    ];
  }
}
