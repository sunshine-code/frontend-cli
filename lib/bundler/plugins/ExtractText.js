import ExtractTextPlugin from "extract-text-webpack-plugin";

import { isProduction } from "../../utils";

export default (options) => new ExtractTextPlugin("[name]-[contenthash:20].css", {
  disable: !isProduction(options.env),
  allChunks: true
});
