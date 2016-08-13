import ExtractTextPlugin from "extract-text-webpack-plugin";

import { isProduction } from "../../utils";

export default (options) => new ExtractTextPlugin({
  filename: "[name]-[contenthash:20].css",
  disable: !isProduction(options.env),
  allChunks: true
});
