import path from "path";

import Generator from "../../../generator";

export default class StylelintGenerator extends Generator {
  constructor(options) {
    super(options, path.resolve(__dirname, "templates"), ".");
  }

  compileTemplate(input) {
    return input;
  }
}
