import { isProduction } from "../../utils";

export default (options) => {
  return {
    loader: "css-loader",
    query: {
      sourceMap: true,
      modules: true,
      localIdentName: isProduction(options.env) ? "[hash:base64]" : "[name]__[local]__[hash:base64:5]",
      camelCase: true,
      minimize: isProduction(options.env)
    }
  }
}
