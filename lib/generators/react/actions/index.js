import path from "path";

import Generator from "../../../generator";
import { ENTRY_PATH } from "../../../constants";
import { camelize } from "../../../utils";

export default class ActionsGenerator extends Generator {
  constructor(options) {
    options.name = camelize(options.name);

    super(
      options,
      path.resolve(__dirname, "templates"),
      path.join(ENTRY_PATH, "actions")
    );
  }
}
