import { resolveExternal } from "../../utils";
import babelLoader from "./babel";

export default (options) => {
  return Object.assign(babelLoader(options), {
    test: /\.jsx?$/i,
    exclude: /node_modules/
  });
}
