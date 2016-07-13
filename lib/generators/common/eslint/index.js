import path from "path";

import Generator from "../../../generator";

export default class EslintGenerator extends Generator {
  constructor(options) {
    super(options, path.resolve(__dirname, "templates"), ".");
  }
}
