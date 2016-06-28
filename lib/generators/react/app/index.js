import path from "path";

import Generator from "../../../generator";
import ComponentGenerator from "../component";
import { resolveExternal } from "../../../utils";

export default class AppGenerator extends Generator {
  constructor(options) {
    options.path = options.path && resolveExternal(options.path);
    options.name = path.basename(options.path || process.cwd());

    super(path.resolve(__dirname, "templates"), ".", options);
  }

  generate() {
    super.generate() &&
    new ComponentGenerator({ name: "App" }).generate();
  }
}
