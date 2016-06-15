import { optimize } from "webpack";

export default () => new optimize.CommonsChunkPlugin({
  name: "vendor",
  filename: "[name]-[chunkhash:20].js",
  chunks: ["main"],
  minChunks: module => /node_modules/.test(module.resource)
});
