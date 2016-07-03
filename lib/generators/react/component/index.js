import path from "path";

import Generator from "../../../generator";
import { ENTRY_PATH } from "../../../constants";
import { camelize, isSCSS } from "../../../utils";

export default class ComponentGenerator extends Generator {
  constructor(options) {
    options.name = camelize(options.name);
    options.stylesExt = isSCSS(options.styles) ? "scss" : "css";

    if (options.content === undefined) options.content = `Hello from ${options.name}!`;

    super(
      path.resolve(__dirname, "templates"),
      path.join(ENTRY_PATH, "components"),
      options
    );

    this.excludes = this.excludes.concat([
      !options.styles && /__name__\/style\.__stylesExt__/,
      !options.assets && /__name__\/assets/
    ].filter(Boolean));
  }
}
