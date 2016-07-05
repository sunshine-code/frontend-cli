import path from "path";

import Generator from "../../../generator";
import { ENTRY_PATH } from "../../../constants";

export default class HTMLGenerator extends Generator {
  constructor(options) {
    super(options, path.resolve(__dirname, "templates"), ENTRY_PATH);
  }

  compileTemplate(input) {
    return input;
  }
}
