import path from "path";

import AppGenerator from "../../common/app";
import ComponentGenerator from "../component";
import ReducerGenerator from "../reducer";

export default class ReactAppGenerator extends AppGenerator {
  constructor(options) {
    let { styles } = options;

    super(path.resolve(__dirname, "templates"), options);

    this.dependentGenerators = [
      new ComponentGenerator({
        name: "Root",
        content: false,
        children: true,
        styles: false,
        assets: false
      }),
      new ComponentGenerator({
        name: "Sample",
        content: "<h1>It works!</h1>",
        children: false,
        styles
      }),
      new ReducerGenerator({ name: "Sample" })
    ];
  }
}
