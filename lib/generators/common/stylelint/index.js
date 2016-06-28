import path from "path";

import Generator from "../../../generator";

export default class StylelintGenerator extends Generator {
  constructor(options) {
    super(path.resolve(__dirname, "templates"), ".", options);
  }

  compileTemplate(input) {
    return input;
  }
}
