import ExtractTextPlugin from "extract-text-webpack-plugin";

import { isProduction } from "../../utils";

export default (options) => {
  return new ExtractTextPlugin("[name]-[contenthash].css", {
    disable: !isProduction(options.env),
    allChunks: true
  });
}
