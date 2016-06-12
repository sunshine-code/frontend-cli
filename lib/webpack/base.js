import webpack from "webpack";

import { APP_PATH, PUBLIC_PATH } from "../constants";
import { resolve, isDevelopment, isProduction } from "../utils";

export default (options, external) => {
  return {
    entry: resolve(APP_PATH),
    output: {
      path: resolve(PUBLIC_PATH),
      filename: isProduction(options.env) ? "[name]-[hash].js" : "[name].js"
    },
    plugins: external.plugins,
    resolve: {
      extensions: ["", ".js", ".jsx", ".ts", ".tsx", ".json"]
    },
    module: {
      loaders: external.loaders
    },
    devtool: isDevelopment(options.env) && "cheap-inline-module-source-map"
  };
}
