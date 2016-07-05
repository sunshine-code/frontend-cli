import path from "path";

import AppGenerator from "../../common/app";
import ComponentGenerator from "../component";
import ReducerGenerator from "../reducer";

export default class ReactAppGenerator extends AppGenerator {
  constructor(options) {
    let { styles } = options;

    super(options, path.resolve(__dirname, "templates"));

    this.dependentGenerators = [
      new ComponentGenerator({
        name: "Root",
        content: false,
        children: true,
        route: false,
        styles: false,
        assets: false
      }),
      new ComponentGenerator({
        name: "Sample",
        content: "<h1>It works!</h1>",
        children: false,
        route: false,
        styles
      }),
      new ReducerGenerator({ name: "Sample" })
    ];
  }
}
