import ExtractTextPlugin from "extract-text-webpack-plugin";

import { ENTRY_PATH } from "../../constants";
import { resolveExternal } from "../../utils";
import cssLoader from "./css";

export default (options) => {
  const loaders = [
    cssLoader(options, { importLoaders: 2 }),
    {
      loader: "sass",
      query: {
        sourceMap: true,
        includePaths: [
          resolveExternal(ENTRY_PATH),
          resolveExternal("node_modules")
        ]
      }
    },
    /**
     * NOTE: Currently, the postcss-loader doesn't support configuration
     * via query property. You should provide options for this loader with
     * the postcss property in the LoaderOptionsPlugin.
     */
    "postcss"
  ];

  return {
    test: /\.scss$/i,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: "style",
      loader: loaders
    })
  };
}
