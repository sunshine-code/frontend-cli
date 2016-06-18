import { ENTRY_PATH, OUTPUT_PATH } from "../constants";
import { resolve, isDevelopment, isProduction } from "../utils";

export default (options, external) => {
  const OUTPUT_FILENAME = `${isProduction(options.env) ? "[name]-[chunkhash:20]" : "[name]" }.js`;

  return {
    entry: { application: ENTRY_PATH },
    output: {
      path: resolve(OUTPUT_PATH),
      filename: OUTPUT_FILENAME,
      chunkFilename: `chunks/${OUTPUT_FILENAME}`
    },
    resolve: {
      modules: [resolve(ENTRY_PATH), "node_modules"],
      extensions: ["", ".js", ".jsx", ".ts", ".tsx", ".json"]
    },
    module: { loaders: external.loaders },
    plugins: external.plugins,
    devtool: isDevelopment(options.env) && "cheap-inline-module-source-map"
  };
}
