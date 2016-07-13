import ExtractTextPlugin from "extract-text-webpack-plugin";

import cssLoader from "./css";

export default (options) => {
  let loaders = [
    Object.assign(cssLoader(options), {
      importLoaders: 1
    }),
    {
      loader: "postcss-loader"
      /**
      * NOTE: Currently, the postcss-loader doesn't support configuration
      * via query property. You should provide options for this loader with
      * the postcss property in the LoaderOptionsPlugin.
      */
    }
  ];

  return {
    test: /\.css$/i,
    exclude: /node_modules/,
    loader: ExtractTextPlugin.extract({
      notExtractLoader: "style-loader",
      loader: loaders
    })
  };
}
