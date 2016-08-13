import ExtractTextPlugin from "extract-text-webpack-plugin";

import { resolveExternal } from "../../utils";
import cssLoader from "./css";

export default (options) => {
  const loaders = [
    cssLoader(options, { importLoaders: 1 }),
    /**
    * NOTE: Currently, the postcss-loader doesn't support configuration
    * via query property. You should provide options for this loader with
    * the postcss property in the LoaderOptionsPlugin.
    */
    "postcss"
  ];

  return {
    test: /\.css$/i,
    exclude: /node_modules/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: "style",
      loader: loaders
    })
  };
}
