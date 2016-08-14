import path from "path";

import { ENTRY_PATH, OUTPUT_PATH } from "../constants";

import {
  isDevelopment,
  isProduction,
  isReact,
  resolveExternal,
  resolveInternal
} from "../utils";

export default (options, partials) => {
  const ENTRY = options.server ? [
    isReact(options.framework) && "react-hot-loader/patch",
    `webpack-dev-server/client?${options.serverURL}`,
    "webpack/hot/only-dev-server",
    ENTRY_PATH
  ].filter(Boolean) : ENTRY_PATH;

  const OUTPUT_FILENAME = `${isProduction(options.env) ? "[name]-[chunkhash:20]" : "[name]"}.js`;

  return {
    entry: { application: ENTRY },
    output: {
      path: resolveExternal(OUTPUT_PATH),
      publicPath: "/",
      filename: OUTPUT_FILENAME,
      chunkFilename: `chunks/${OUTPUT_FILENAME}`
    },
    resolve: {
      modules: [resolveExternal(ENTRY_PATH), resolveExternal("node_modules"), resolveInternal("node_modules")],
      extensions: ["", ".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".scss"]
    },
    resolveLoader: {
      modules: [resolveExternal("node_modules"), resolveInternal("node_modules")]
    },
    module: { loaders: partials.loadersConfig },
    plugins: partials.pluginsConfig,
    devtool: isDevelopment(options.env) && "cheap-inline-module-source-map"
  };
}
