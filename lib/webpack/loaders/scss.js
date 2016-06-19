import ExtractTextPlugin from "extract-text-webpack-plugin";

import { ENTRY_PATH } from "../../constants";
import { resolve } from "../../utils";

export default (options) => {
  let loaders = [
    {
      loader: "css-loader",
      query: {
        sourceMap: true,
        modules: true
      }
    },
    {
      loader: "sass-loader",
      query: {
        sourceMap: true,
        includePaths: [
          resolve(ENTRY_PATH),
          resolve("node_modules")
        ]
      }
    }
  ];

  return {
    test: /\.scss$/i,
    loader: ExtractTextPlugin.extract({
      notExtractLoader: "style-loader",
      loader: loaders
    })
  };
}
