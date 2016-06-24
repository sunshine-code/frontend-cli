import { ENTRY_PATH } from "../../constants";
import { resolveExternal } from "../../utils";
import babelLoader from "./babel";

export default (options) => {
  return Object.assign(babelLoader(options), {
    test: /\.jsx?$/i,
    include: resolveExternal(ENTRY_PATH)
  });
}
