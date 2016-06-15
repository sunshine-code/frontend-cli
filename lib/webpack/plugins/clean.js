import CleanPlugin from "clean-webpack-plugin";

import { OUTPUT_PATH } from "../../constants";

export default () => new CleanPlugin(OUTPUT_PATH, {
  root: process.cwd(),
  verbose: false
});
